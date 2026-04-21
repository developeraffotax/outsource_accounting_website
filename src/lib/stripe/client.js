import Stripe from "stripe";

export const STRIPE_API_VERSION = "2026-03-25.dahlia";

export const createStripeClient = (secretKey) => {
  if (!secretKey) {
    throw new Error("Stripe secret key is required");
  }

  return new Stripe(secretKey, {
    apiVersion: STRIPE_API_VERSION,
  });
};
