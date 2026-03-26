import Stripe from "stripe";
import buyService from "@/lib/controllers/buyService.controller";

export async function POST(req) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw Object.assign(new Error("Server is missing STRIPE_SECRET_KEY"), {
        statusCode: 500,
      });
    }

    const stripe = new Stripe(stripeSecretKey);

    const feePercentRaw = process.env.STRIPE_FEE_PERCENT ?? "0";
    const feeFixedGbpRaw = process.env.STRIPE_FEE_FIXED_GBP ?? "0";
    const feePercent = parseFloat(feePercentRaw);
    const feeFixedPence = Math.round(parseFloat(feeFixedGbpRaw) * 100);

    if (!Number.isFinite(feePercent) || !Number.isFinite(feeFixedPence)) {
      throw Object.assign(
        new Error(
          "Invalid STRIPE_FEE_PERCENT or STRIPE_FEE_FIXED_GBP configuration",
        ),
        { statusCode: 500 },
      );
    }

    const { serviceName } = await req.json();
    if (!serviceName || typeof serviceName !== "string") {
      throw Object.assign(new Error("serviceName is required"), {
        statusCode: 400,
      });
    }

    const service = await buyService(serviceName);

    const serviceAmountPence = Math.round(Number(service.price) * 100);

    if (!Number.isFinite(serviceAmountPence) || serviceAmountPence <= 0) {
      throw Object.assign(new Error("Invalid service price"), {
        statusCode: 500,
      });
    }

    const processingFeePence = Math.round(
      serviceAmountPence * feePercent + feeFixedPence,
    );

    const feeLabel = `${(feePercent * 100).toFixed(1)}% + £${(feeFixedPence / 100).toFixed(2)}`;

    const baseUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
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
      success_url: `${baseUrl}/paymentConfirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/paymentCencled?serviceName=${encodeURIComponent(service.name)}`,
    });

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
