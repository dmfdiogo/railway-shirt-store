---
description: "Use when integrating Stripe checkout, subscriptions, products, prices, webhooks, refunds, or Stripe CLI workflows in this app."
---

# Stripe Workflow

- Prefer Checkout Sessions first unless the task explicitly requires a custom Elements or Payment Intents flow.
- Read `.agents/skills/stripe-integration/SKILL.md` and `.ctx7/stripe/context.md` when implementing payment flows or webhook handling.
- Never put Stripe secret keys or webhook secrets in client code, public environment variables, or committed files.
- Treat the success or cancel redirect as UX only; the source of truth for order fulfillment must be the server-side webhook flow.
- Use Stripe CLI for local webhook forwarding and event triggering during development when validating Stripe behavior.
- Resolve prices, products, and secrets from server-side configuration or environment variables, not hardcoded literals scattered through the app.
- When a Stripe change introduces new operational requirements, document the exact environment variables and webhook events needed.