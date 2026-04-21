import { createHmac, timingSafeEqual } from "crypto";
import { createStripeClient } from "@/lib/stripe/client";

const isValidReceiptToken = ({ session, receiptToken, stripeSecretKey }) => {
  const clientReferenceId = session?.client_reference_id;
  const receiptNonce = session?.metadata?.receiptNonce;

  if (
    typeof receiptToken !== "string" ||
    !clientReferenceId ||
    typeof receiptNonce !== "string"
  ) {
    return false;
  }

  const tokenSecret = process.env.CHECKOUT_SESSION_TOKEN_SECRET || stripeSecretKey;

  if (!tokenSecret) {
    return false;
  }

  const expectedToken = createHmac("sha256", tokenSecret)
    .update(`${clientReferenceId}.${receiptNonce}`)
    .digest("hex");

  if (expectedToken.length !== receiptToken.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(expectedToken, "utf8"),
    Buffer.from(receiptToken, "utf8"),
  );
};

export async function GET(req) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return Response.json(
        { error: "Server is missing STRIPE_SECRET_KEY" },
        { status: 500 },
      );
    }

    const stripe = createStripeClient(stripeSecretKey);

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const receiptToken = searchParams.get("receipt_token");

    if (!sessionId) {
      return Response.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }
    if (!receiptToken) {
      return Response.json({ error: "receipt_token is required" }, { status: 400 });
    }

    let session;

    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.latest_charge", "line_items.data.price.product"],
      });
    } catch (err) {
      // Unknown session
      if (err.code === "resource_missing") {
        return Response.json({ error: "Session not found" }, { status: 404 });
      }

      throw err;
    }

    if (!isValidReceiptToken({ session, receiptToken, stripeSecretKey })) {
      return Response.json({ error: "Invalid receipt token" }, { status: 403 });
    }

    return Response.json({
      sessionId: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      email:
        session.customer_details?.email ||
        (typeof session.customer_email === "string" ? session.customer_email : null),
      receipt_url: session.payment_intent?.latest_charge?.receipt_url || null,
    });
  } catch (error) {
    console.error("Stripe session fetch error:", error);

    return Response.json(
      { error: "Failed to retrieve checkout session" },
      { status: 500 },
    );
  }
}
