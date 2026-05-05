<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Workspace Guidelines

## Platform Workflow

- Prefer the workspace agents in `.github/agents/` for Railway and Stripe tasks.
- Prefer CLI-first workflows from VS Code over asking the user to open the Railway or Stripe dashboards.
- Use Railway CLI for project status, linking, services, variables, and deployment-related operations when possible.
- Use Stripe CLI for webhook forwarding, event triggering, and local payment-flow validation when possible.
- Only fall back to web dashboards when a capability is unavailable through the configured tools.

## Secrets And Environments

- Never hardcode Railway tokens, Stripe API keys, or webhook secrets in source files.
- Keep Stripe secret values server-side only; only publishable keys may reach browser code.
- When adding integrations, document the required environment variables and where they are consumed.
- Treat Railway-managed private resources as server-side dependencies; do not connect browsers directly to private services.

## App Stack

- This workspace is a Next.js App Router app on Next 16, React 19, and TypeScript.
- Before changing framework behavior or APIs, read the relevant guide in `node_modules/next/dist/docs/`.
- Prefer narrow, reversible changes and validate with the smallest relevant check after editing.
