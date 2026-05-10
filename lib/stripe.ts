import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getStripeServerClient() {
  if (!stripeClient) {
    stripeClient = new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"));
  }

  return stripeClient;
}

export function getStripePriceId() {
  return getRequiredEnv("STRIPE_PRICE_ID");
}

export function getStripeWebhookSecret() {
  return getRequiredEnv("STRIPE_WEBHOOK_SECRET");
}

export function getStripePublishableKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? getRequiredEnv("STRIPE_PUBLISHABLE_KEY");
}

export function getAppUrl(origin: string) {
  return process.env.APP_URL ?? origin;
}