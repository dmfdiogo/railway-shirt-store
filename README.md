# Railway Shirt Store

Next.js 16 storefront prepared for Railway deploys with Prisma, Better Auth, and Stripe Checkout.

## Current Scope

- Hosted Stripe Checkout Session created on the server
- Prisma schema and initial migration for auth, catalog, orders, and webhook events
- Better Auth mounted on App Router with email/password sign-in and sign-up
- Stripe webhook endpoint as the server-side source of truth for payment confirmation
- Railway-ready project with runtime environment variable checks and Postgres wiring

## Required Environment Variables

Copy `.env.example` into `.env.local` for local development.

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/railway_shirt_store
BETTER_AUTH_SECRET=replace-with-a-32-plus-char-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
APP_URL=http://localhost:3000
MELHOR_ENVIO_ENVIRONMENT=sandbox
MELHOR_ENVIO_CLIENT_ID=9283
MELHOR_ENVIO_CLIENT_SECRET=replace-with-melhor-envio-app-secret
MELHOR_ENVIO_REDIRECT_URI=http://localhost:3000/api/integrations/melhor-envio/callback
MELHOR_ENVIO_ACCESS_TOKEN=me_access_token
MELHOR_ENVIO_FROM_POSTAL_CODE=96020360
MELHOR_ENVIO_SERVICE_IDS=1,2
ORDER_OPERATOR_EMAILS=owner@beartstore.com.br
MELHOR_ENVIO_OPERATOR_EMAILS=owner@beartstore.com.br
MELHOR_ENVIO_USER_AGENT=Be Art (contato@beartstore.com.br)
MELHOR_ENVIO_DEFAULT_WIDTH_CM=18
MELHOR_ENVIO_DEFAULT_HEIGHT_CM=4
MELHOR_ENVIO_DEFAULT_LENGTH_CM=26
MELHOR_ENVIO_DEFAULT_WEIGHT_KG=0.3
```

Generate a secret with:

```bash
openssl rand -base64 32
```

## Local Development

Install dependencies and run the app:

```bash
npm install
npm run db:generate
npm run dev
```

If you are applying the schema to a real database for the first time, run:

```bash
npm run db:migrate:dev
```

In another terminal, forward Stripe webhooks to the local route handler:

```bash
npm run stripe:listen
```

Use the CLI output from `stripe listen` to fill `STRIPE_WEBHOOK_SECRET`.

For Google OAuth, register this redirect URI in Google Cloud Console:

```bash
http://localhost:3000/api/auth/callback/google
```

For Melhor Envio, configure the sandbox app credentials, an origin CEP, and then authorize the app through `/operacoes/frete`. The callback must match `MELHOR_ENVIO_REDIRECT_URI` exactly. The current integration stores the OAuth token server-side and quotes freights through `/api/shipping/quote`, falling back to the fixed regional table when Melhor Envio is unavailable or not configured. Set `MELHOR_ENVIO_OPERATOR_EMAILS` with a comma-separated allowlist to keep this operations page out of regular customer accounts.

For order operations, use `ORDER_OPERATOR_EMAILS` as a separate comma-separated allowlist for `/admin/orders`. Do not rely on `MELHOR_ENVIO_OPERATOR_EMAILS` for this anymore. If `ORDER_OPERATOR_EMAILS` is empty in local development, the order admin stays open to authenticated sessions outside production so you can test the flow quickly; set it in `.env.local` when you want local access to match production behavior.

## Railway Deploy Flow

The Railway project is already created and linked for this repository.

1. Provision a Railway Postgres service if the project does not already have one.
2. Wire `DATABASE_URL` in the `web` service to the Postgres service reference.
3. Set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `APP_URL`, `ORDER_OPERATOR_EMAILS`, `MELHOR_ENVIO_ENVIRONMENT`, `MELHOR_ENVIO_CLIENT_ID`, `MELHOR_ENVIO_CLIENT_SECRET`, `MELHOR_ENVIO_REDIRECT_URI`, `MELHOR_ENVIO_FROM_POSTAL_CODE`, `MELHOR_ENVIO_SERVICE_IDS`, `MELHOR_ENVIO_OPERATOR_EMAILS`, `MELHOR_ENVIO_USER_AGENT`, `MELHOR_ENVIO_DEFAULT_WIDTH_CM`, `MELHOR_ENVIO_DEFAULT_HEIGHT_CM`, `MELHOR_ENVIO_DEFAULT_LENGTH_CM`, and `MELHOR_ENVIO_DEFAULT_WEIGHT_KG` in the `web` service variables.
4. Deploy from the workspace with `railway up`.
5. Run `npm run db:migrate:deploy` in the deployed environment so the schema lands in Postgres.
6. Register the production webhook endpoint at `/api/stripe/webhook` in Stripe and store the matching signing secret in Railway.

`ORDER_OPERATOR_EMAILS` and `MELHOR_ENVIO_OPERATOR_EMAILS` should usually be set independently in Railway, even if they temporarily contain the same email list. The first controls who can operate customer orders; the second controls who can manage the Melhor Envio integration.

For production Google OAuth, register this redirect URI:

```bash
https://www.beartstore.com.br/api/auth/callback/google
```

## Workspace Operations

This workspace is configured for a CLI-first Railway and Stripe workflow.

- Use Railway CLI and Stripe CLI as the default operational path instead of the web dashboards.
- Workspace guidance lives in `AGENTS.md`, `.github/instructions/railway.instructions.md`, and `.github/instructions/stripe.instructions.md`.
- Reusable Copilot prompts are available in `.github/prompts/railway-deploy-check.prompt.md` and `.github/prompts/stripe-catalog-sync.prompt.md`.
- The shared runbook for the current infrastructure setup lives in `.docs/runbooks/railway-and-stripe-setup.md`.
- The workspace hook in `.github/hooks/secret-guard.json` adds a confirmation step when a tool action appears to include a secret or `.env` write.

## Stripe Notes

- Keep all Stripe secret values server-side.
- The success page is not the source of truth for fulfillment; the webhook updates local orders.
- Checkout creates a local order before redirecting to Stripe and stores the local `orderId` in Stripe metadata.
- If the customer is signed in, the checkout flow can associate the order with the Better Auth user.
