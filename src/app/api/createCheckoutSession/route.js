import Stripe from "stripe";
import buyService from "@/lib/controllers/buyService.controller";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FEE_PERCENT = parseFloat(process.env.STRIPE_FEE_PERCENT);
const FEE_FIXED_PENCE = Math.round(
  parseFloat(process.env.STRIPE_FEE_FIXED_GBP) * 100,
);

export async function POST(req) {
  try {
    const { serviceName } = await req.json();

    const service = await buyService(serviceName);

    const serviceAmountPence = Math.round(Number(service.price) * 100);
    const processingFeePence = Math.round(
      serviceAmountPence * FEE_PERCENT + FEE_FIXED_PENCE,
    );

    const feeLabel = `${(FEE_PERCENT * 100).toFixed(1)}% + £${(FEE_FIXED_PENCE / 100).toFixed(2)}`;

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
      success_url:
        process.env.SITE_URL +
        "/paymentConfirmed?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        process.env.SITE_URL +
        `/paymentCencled?serviceName=${encodeURIComponent(service.name)}`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
