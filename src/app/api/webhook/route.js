import Stripe from "stripe";
import {
  sendCustomerPaymentEmail,
  sendAdminPaymentEmail,
} from "@/lib/services/paymentEmail.services";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;
  // try deploying
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items", "payment_intent.latest_charge"],
      },
    );

    const customerEmail = session.customer_details?.email;
    const amountTotal = session.amount_total;
    const currency = session.currency;
    const receiptUrl =
      session.payment_intent?.latest_charge?.receipt_url || null;

    // Get the service name from the first line item (the service, not the fee)
    const serviceName = session.line_items?.data?.[0]?.description || "Service";

    if (customerEmail) {
      await sendCustomerPaymentEmail({
        customerEmail,
        amountTotal,
        currency,
        serviceName,
        receiptUrl,
      });
    }

    await sendAdminPaymentEmail({
      customerEmail: customerEmail || "Unknown",
      amountTotal,
      currency,
      serviceName,
    });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
