import { randomUUID } from "crypto";
import { createHmac } from "crypto";
import buyService from "@/lib/controllers/buyService.controller";
import fetchServicesContent from "@/lib/data/services/servicesContent";
import { createStripeClient } from "@/lib/stripe/client";

const UK_B2B_STRIPE_FEE_PERCENT = 0.029;
const UK_B2B_STRIPE_FEE_FIXED_PENCE = 20;

const resolveFeeConfig = () => {
  const percentFromEnv = Number(process.env.STRIPE_FEE_PERCENT);
  const fixedPenceFromEnv = Number(process.env.STRIPE_FEE_FIXED_PENCE);

  const feePercent = Number.isFinite(percentFromEnv)
    ? percentFromEnv
    : UK_B2B_STRIPE_FEE_PERCENT;

  const feeFixedPence = Number.isFinite(fixedPenceFromEnv)
    ? Math.round(fixedPenceFromEnv)
    : UK_B2B_STRIPE_FEE_FIXED_PENCE;

  if (feePercent <= 0 || feePercent >= 1) {
    throw Object.assign(new Error("Invalid STRIPE_FEE_PERCENT configuration"), {
      statusCode: 500,
    });
  }

  if (feeFixedPence < 0) {
    throw Object.assign(
      new Error("Invalid STRIPE_FEE_FIXED_PENCE configuration"),
      {
        statusCode: 500,
      },
    );
  }

  return { feePercent, feeFixedPence };
};

const calculateGrossChargePence = ({
  netAmountPence,
  feePercent,
  feeFixedPence,
}) => {
  return Math.ceil((netAmountPence + feeFixedPence) / (1 - feePercent));
};

const normalizeName = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const deriveDeterministicHex = ({ secret, seed, context, length = 32 }) => {
  return createHmac("sha256", secret)
    .update(`${seed}:${context}`)
    .digest("hex")
    .slice(0, length);
};

const getMongoPricingPlans = async () => {
  const services = await fetchServicesContent();

  return services.flatMap((service) => {
    if (Array.isArray(service?.Pricing?.plans)) {
      return service.Pricing.plans;
    }

    return [];
  });
};

const resolveServiceForCheckout = async (serviceName) => {
  const normalizedRequestedName = normalizeName(serviceName);
  let pricingPlans = [];

  try {
    pricingPlans = await getMongoPricingPlans();
  } catch (error) {
    console.error("Failed to load pricing plans from services content:", error);
  }

  const pricingPlan = pricingPlans.find(
    (plan) =>
      normalizeName(plan?.name) === normalizedRequestedName ||
      normalizeName(plan?.checkoutName) === normalizedRequestedName,
  );

  if (pricingPlan) {
    return {
      name: pricingPlan.checkoutName || pricingPlan.name,
      price: String(pricingPlan.price),
    };
  }

  return buyService(serviceName);
};

export async function POST(req) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw Object.assign(new Error("Server is missing STRIPE_SECRET_KEY"), {
        statusCode: 500,
      });
    }

    const stripe = createStripeClient(stripeSecretKey);

    const { feePercent, feeFixedPence } = resolveFeeConfig();

    const { serviceName } = await req.json();
    if (!serviceName || typeof serviceName !== "string") {
      throw Object.assign(new Error("serviceName is required"), {
        statusCode: 400,
      });
    }

    const service = await resolveServiceForCheckout(serviceName);

    const serviceAmountPence = Math.round(Number(service.price) * 100);

    if (!Number.isFinite(serviceAmountPence) || serviceAmountPence <= 0) {
      throw Object.assign(new Error("Invalid service price"), {
        statusCode: 500,
      });
    }

    const totalChargePence = calculateGrossChargePence({
      netAmountPence: serviceAmountPence,
      feePercent,
      feeFixedPence,
    });

    const processingFeePence = totalChargePence - serviceAmountPence;

    if (processingFeePence <= 0) {
      throw Object.assign(new Error("Calculated processing fee is invalid"), {
        statusCode: 500,
      });
    }

    const feeLabel = `${(feePercent * 100).toFixed(1)}% + £${(feeFixedPence / 100).toFixed(2)}`;

    const baseUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(req.url).origin;

    const receiptTokenSecret =
      process.env.CHECKOUT_SESSION_TOKEN_SECRET || stripeSecretKey;

    const idempotencyKey =
      req.headers.get("x-idempotency-key") ||
      `checkout:${normalizeName(service.name)}:${randomUUID()}`;

    // Keep Stripe payload fields deterministic for the same idempotency key.
    // This avoids receipt token drift across request retries.
    const clientReferenceId = deriveDeterministicHex({
      secret: receiptTokenSecret,
      seed: idempotencyKey,
      context: "client-reference-id",
    });
    const receiptNonce = deriveDeterministicHex({
      secret: receiptTokenSecret,
      seed: idempotencyKey,
      context: "receipt-nonce",
    });

    const receiptToken = createHmac("sha256", receiptTokenSecret)
      .update(`${clientReferenceId}.${receiptNonce}`)
      .digest("hex");

    const sessionMetadata = {
      serviceName: service.name,
      serviceAmountPence: String(serviceAmountPence),
      processingFeePence: String(processingFeePence),
      feePercent: String(feePercent),
      feeFixedPence: String(feeFixedPence),
      receiptNonce,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: clientReferenceId,
      metadata: sessionMetadata,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service.name,
            },
            unit_amount: serviceAmountPence,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Stripe | Card Processing Fee",
              description: feeLabel,
            },
            unit_amount: processingFeePence,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/paymentConfirmed?session_id={CHECKOUT_SESSION_ID}&receipt_token=${receiptToken}`,
      cancel_url: `${baseUrl}/paymentCencled?serviceName=${encodeURIComponent(service.name)}`,
    }, { idempotencyKey });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error);

    const status = error?.statusCode || 500;
    const message =
      status >= 400 && status < 500
        ? error.message
        : "Failed to create checkout session";

    return Response.json({ error: message }, { status });
  }
}
