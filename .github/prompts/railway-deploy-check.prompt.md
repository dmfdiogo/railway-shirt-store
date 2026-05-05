---
name: "Railway Deploy Check"
description: "Deploy or validate the current app on Railway. Use when shipping a change, checking service health, reviewing logs, or confirming the public URL."
argument-hint: "Optional note about what changed or what to validate"
agent: "Railway Operator"
---

Deploy or validate the current workspace on Railway.

Workflow:
- Confirm the linked project, environment, service, and current deployment state.
- Inspect variables, logs, domains, and service status before making changes.
- If appropriate, deploy the current directory with Railway CLI.
- Validate the resulting service health and public URL.
- Summarize the outcome, blockers, and the next operational step.

Constraints:
- Prefer Railway CLI over the dashboard.
- Do not print secret variable values.
- Use the smallest safe mutating step.

Return:
- Railway context
- Action taken
- Validation result
- Follow-up items