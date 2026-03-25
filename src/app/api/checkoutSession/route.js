import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    // Validate session_id
    if (!sessionId) {
      return Response.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    let session;

    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.latest_charge"],
      });
    } catch (err) {
      // Unknown session
      if (err.code === "resource_missing") {
        return Response.json({ error: "Session not found" }, { status: 404 });
      }

      throw err;
    }

    const paymentIntent = session.payment_intent;
    const latestCharge = paymentIntent?.latest_charge;

    return Response.json({
      sessionId: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email || null,
      receipt_url: latestCharge?.receipt_url || null,
    });
  } catch (error) {
    console.error("Stripe session fetch error:", error);

    return Response.json(
      { error: "Failed to retrieve checkout session" },
      { status: 500 },
    );
  }
}
