---
name: "Stripe Catalog Sync"
description: "Create or update Stripe product, price, and webhook configuration for this app, then sync the required identifiers to Railway. Use when operating the Stripe catalog or webhook flow for this project."
argument-hint: "Describe the catalog or webhook change you want"
agent: "Stripe Integrator"
---

Operate the Stripe setup for this workspace.

Workflow:
- Confirm the active Stripe account or sandbox before making changes.
- Inspect existing product, price, and webhook resources to avoid duplicates.
- Create or update the Stripe resources needed for the task.
- Sync resulting identifiers and secrets to Railway when required.
- Validate the checkout or webhook behavior with the smallest useful test.

Constraints:
- Keep secret values server-side only.
- Prefer Checkout Sessions over more complex payment flows unless the task requires otherwise.
- Avoid creating duplicate Stripe resources when an existing one should be updated.

Return:
- Active Stripe context
- Resources created or updated
- Railway variables that were changed
- Validation result and follow-up items