#!/usr/bin/env bash

set -euo pipefail

payload="$(cat)"

if ! printf '%s' "$payload" | grep -Eq 'apply_patch|create_file|run_in_terminal|edit_notebook_file|create_and_run_task'; then
  cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow","permissionDecisionReason":"No guarded write or command tool detected."}}
EOF
  exit 0
fi

if printf '%s' "$payload" | grep -Eiq '(^|[^A-Za-z])(sk_(test|live)_[A-Za-z0-9_]+|rk_(test|live)_[A-Za-z0-9_]+|whsec_[A-Za-z0-9_]+|RAILWAY_TOKEN|STRIPE_SECRET_KEY[[:space:]]*=|STRIPE_WEBHOOK_SECRET[[:space:]]*=|\.env(\.[A-Za-z0-9_-]+)?)'; then
  cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Possible secret value or .env write detected. Confirm before continuing."}}
EOF
  exit 0
fi

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow","permissionDecisionReason":"No guarded secret patterns detected."}}
EOF