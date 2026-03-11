import Stripe from "stripe";
import buyService from "@/lib/controllers/buyService.controller";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { serviceName } = await req.json();

    const service = await buyService(serviceName);

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
            unit_amount: Math.round(Number(service.price) * 100),
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
