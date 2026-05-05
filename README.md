# Railway Shirt Store

Next.js 16 storefront scaffold prepared for Railway deploys and Stripe Checkout.

## Current Scope

- Hosted Stripe Checkout Session created on the server
- Stripe webhook endpoint for final payment confirmation
- Railway-ready project with runtime environment variable checks
- No database yet; product pricing is referenced from Stripe through `STRIPE_PRICE_ID`

## Required Environment Variables

Copy `.env.example` into `.env.local` for local development.

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_URL=http://localhost:3000
```

## Local Development

Install dependencies and run the app:

```bash
npm install
npm run dev
```

In another terminal, forward Stripe webhooks to the local route handler:

```bash
npm run stripe:listen
```

Use the CLI output from `stripe listen` to fill `STRIPE_WEBHOOK_SECRET`.

## Railway Deploy Flow

The Railway project is already created and linked for this repository.

1. Create or link the web service in Railway.
2. Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, and optionally `APP_URL` in the Railway service variables.
3. Deploy from the workspace with `railway up`.
4. Generate a Railway domain for the deployed service and use it as `APP_URL` if you want a fixed canonical origin.
5. Register the production webhook endpoint at `/api/stripe/webhook` in Stripe and store the matching signing secret in Railway.

## Stripe Notes

- Keep all Stripe secret values server-side.
- The success page is not the source of truth for fulfillment; `checkout.session.completed` is.
- If you decide to move product data into your own database later, keep Stripe as the payment system of record and synchronize only the identifiers you need.
