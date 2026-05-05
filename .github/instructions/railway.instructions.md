---
description: "Use when working with Railway, railway CLI, deployments, services, environment variables, project linking, or databases managed on Railway."
---

# Railway Workflow

- Prefer Railway CLI and the local workspace references over the Railway dashboard.
- Read `.agents/skills/railway-database/SKILL.md` and `.ctx7/railway/context.md` when the task involves services, variables, or database provisioning.
- Start mutable Railway work by confirming the active project and environment with `railway status --json`.
- Before creating a service, database, or variable, inspect the current state first to avoid duplicates.
- Keep private connection strings and service URLs in Railway environment variables, then consume them from server-side code.
- If a frontend feature needs Railway data, route it through server code or API handlers instead of exposing private resources directly.
- Prefer reversible CLI steps and summarize any command the user may need to rerun outside the agent.