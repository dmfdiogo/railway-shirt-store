## Railway and Stripe Setup Runbook

This document records what was configured in the `railway-shirt-store` project for Railway deployment and Stripe payments.

## Setup goals

- Prepare the workspace to operate Railway and Stripe mainly through CLI workflows and Copilot agents.
- Create a working Railway deployment for the Next.js application.
- Integrate Stripe Checkout with a server-side webhook.
- Keep the setup documented without exposing secrets in versioned files.

## Current state

### Application

- Framework: Next.js 16 with App Router.
- Published runtime: web application with Stripe-hosted checkout.
- Current public URL: `https://web-production-47653.up.railway.app`
- Validated status: active deployment with `SUCCESS` status.

### Railway

- Project: `railway-shirt-store`
- Project ID: `9e7b7f1f-03a2-4562-af5d-017049a592b4`
- Workspace: `Diogo Magrini Furmann's Projects`
- Environment: `production`
- Service: `web`
- Service ID: `944e5f2b-12c1-4a00-a978-fa4024379d3e`
- Railway domain: `https://web-production-47653.up.railway.app`
- Configured public variable: `APP_URL`

### Stripe

- Account in use: `Be Art sandbox`
- Account ID: `acct_1RMBYyDEAgVjrdqw`
- Product created for this project: `prod_USfCVYsjQH0xW7`
- Active price used by the application: `price_1TTjsDDEAgVjrdqwyqSKbKRS`
- Project webhook endpoint: `we_1TTjuJDEAgVjrdqwyhSq7tmO`
- Main event configured on the webhook: `checkout.session.completed`

## What was implemented in code

### Agents and instruction structure

- Added global rules in `AGENTS.md` to guide the workspace for Railway and Stripe tasks.
- Created the specialized Railway agent in `.github/agents/railway.agent.md`.
- Created the specialized Stripe agent in `.github/agents/stripe.agent.md`.
- Added theme-specific instructions in `.github/instructions/railway.instructions.md` and `.github/instructions/stripe.instructions.md`.

### Next.js application

- Replaced the default `create-next-app` landing page with a storefront and operational checklist.
- Added the `POST /api/checkout-session` route to create Checkout Sessions server-side.
- Added the `POST /api/stripe/webhook` route to validate signatures and receive `checkout.session.completed`.
- Added checkout return pages for success and cancellation.
- Added a central helper in `lib/stripe.ts` for environment access and Stripe SDK initialization.

### Runtime configuration

- Added the `stripe` dependency to the project.
- Adjusted the `start` script for Railway host and `PORT` binding.
- Added the `stripe:listen` script for local development.
- Created `.env.example` as a local reference.
- Updated `README.md` with the minimum development and deployment flow.

## Relevant environment variables

The variables below exist in the Railway `web` service. Secret values must not be recorded in this document.

| Variable | Purpose | Consumed by |
| --- | --- | --- |
| `APP_URL` | Defines the public application origin for redirects | `lib/stripe.ts`, `app/api/checkout-session/route.ts` |
| `STRIPE_SECRET_KEY` | Stripe secret key for server-side API calls | `lib/stripe.ts` |
| `STRIPE_PRICE_ID` | Active price used by the Checkout Session | `lib/stripe.ts`, `app/api/checkout-session/route.ts` |
| `STRIPE_WEBHOOK_SECRET` | Signature secret for the public webhook endpoint | `lib/stripe.ts`, `app/api/stripe/webhook/route.ts` |

## Commands used during the process

Note: the list below is a condensed operational log. Some commands were discovery and diagnostic steps, while others were the final commands that left the environment ready.

### Railway CLI

| Command | Short description |
| --- | --- |
| `railway --version` | Verified the Railway CLI installation |
| `railway whoami` | Confirmed the authenticated Railway account |
| `railway login` | Started Railway login in the terminal |
| `railway list` | Listed available projects in the account |
| `railway init -n railway-shirt-store --json` | Created the Railway project for this repository |
| `railway status --json` | Confirmed the local project and environment link |
| `railway add --service web --json` | Created the `web` service for the application |
| `railway up -s web -d` | Deployed the app to the `web` service |
| `railway domain -s web --json` | Generated the public service domain |
| `railway variable list -s web -k` | Listed service variables for inspection |
| `railway variable list -s web --json` | Validated active variables as JSON |
| `railway variable --set ... -s web` | Wrote Stripe variables and `APP_URL` to the service |
| `railway service list` | Checked which services existed in the environment |
| `railway service status` | Followed deployment progress |
| `railway logs --build --latest --lines 30` | Inspected deployment build logs |
| `railway logs --http --lines 20 --path /api/stripe/webhook` | Confirmed traffic on the published webhook |

### Stripe CLI

| Command | Short description |
| --- | --- |
| `stripe version` | Verified the Stripe CLI installation |
| `stripe whoami` | Confirmed the active account and sandbox |
| `stripe login` | Reauthenticated the Stripe CLI session |
| `stripe products list --limit 1` | Validated that the CLI could reach the API |
| `stripe config --list` | Inspected local session data for CLI operations |
| `stripe products create --name "Railway Shirt" ...` | Created the project product in the sandbox |
| `stripe prices create --currency brl --unit-amount 7900 --product prod_USfCVYsjQH0xW7 ...` | Created the final price used by the application |
| `stripe products update prod_USfCVYsjQH0xW7 --default-price price_1TTjsDDEAgVjrdqwyqSKbKRS -c` | Marked the final price as the product default |
| `stripe webhook_endpoints create --url https://web-production-47653.up.railway.app/api/stripe/webhook ...` | Created the public project webhook and returned the `whsec` |
| `stripe webhook_endpoints list --limit 5` | Validated the created endpoint |
| `stripe trigger checkout.session.completed` | Triggered a Stripe test event |

### Node and npm

| Command | Short description |
| --- | --- |
| `npm install stripe` | Installed the official Stripe SDK |
| `npm ls stripe` | Confirmed the dependency was installed correctly |
| `npm run build` | Validated the production build locally |

## Practical sequence of what happened

1. The workspace was prepared with Railway and Stripe agents and instructions.
2. The Railway project `railway-shirt-store` was created and linked to the local directory.
3. The `web` service was created in the `production` environment.
4. The Next.js application was adapted for Railway and Stripe Checkout.
5. The app was deployed to Railway for the first time.
6. A Railway domain was generated and stored in `APP_URL`.
7. The Stripe CLI was reauthenticated and the `Be Art` sandbox was selected.
8. The project product, price, and webhook were created in Stripe.
9. The Stripe variables were written to Railway.
10. The app was redeployed and the public URL showed checkout as ready.
11. The buy button was validated with a real redirect to Stripe Checkout.
12. The `checkout.session.completed` webhook was observed in application logs.

## Validations performed

- Local Next.js build completed successfully with `npm run build`.
- Railway `web` service reached `SUCCESS` status.
- The public URL loaded the project interface correctly.
- The application checklist showed `ok` for all three Stripe variables.
- The buy button redirected to a hosted Stripe Checkout Session.
- `checkout.session.completed` was logged by the application.

## Important considerations

- No secrets should be committed to the repository.
- This document records IDs, URLs, and commands, but not secret values.
- Stripe still uses an existing sandbox (`Be Art sandbox`), so product names and descriptions should remain clearly scoped to this project.
- The database has not been defined yet, and the current checkout flow does not rely on app-side persistence.

## Suggested next steps

1. Define the real store catalog: names, prices, SKUs, and variation policy.
2. Decide what should remain the source of truth in Stripe and what requires local persistence.
3. Introduce a database only when the order, inventory, and fulfillment model is clear.
4. Once a database exists, connect webhook fulfillment to order persistence and payment history.