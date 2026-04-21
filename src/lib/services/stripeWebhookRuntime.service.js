export const EVENT_STATUS_MAP = {
  "checkout.session.completed": "completed",
  "checkout.session.async_payment_failed": "failed",
  "checkout.session.expired": "cancelled",
  "payment_intent.canceled": "cancelled",
};

export const verifyStripeWebhookEvent = ({ stripe, body, signature, secret }) => {
  return stripe.webhooks.constructEvent(body, signature, secret);
};
