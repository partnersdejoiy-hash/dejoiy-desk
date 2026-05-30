#!/usr/bin/env bash
# Quick check that Cursor / CI injected deploy secrets (no values printed).
set -euo pipefail

ok=true
for name in DEJOIY_DEPLOY_HOST DEJOIY_DEPLOY_USER DEJOIY_DEPLOY_FQDN; do
  if [[ -n "${!name:-}" ]]; then
    echo "OK  $name is set"
  else
    echo "MISSING  $name"
    ok=false
  fi
done

if [[ -n "${DEJOIY_DEPLOY_PASSWORD:-}" ]]; then
  echo "OK  DEJOIY_DEPLOY_PASSWORD is set"
elif [[ -n "${DEJOIY_DEPLOY_SSH_KEY:-}" ]]; then
  echo "OK  DEJOIY_DEPLOY_SSH_KEY is set"
else
  echo "MISSING  DEJOIY_DEPLOY_PASSWORD or DEJOIY_DEPLOY_SSH_KEY"
  ok=false
fi

if [[ "$ok" == true ]]; then
  echo "All deploy secrets present — run: ./deploy/scripts/agent-ssh-deploy.sh"
  exit 0
fi

echo ""
echo "Secrets are not visible in this shell. In Cursor:"
echo "  Cloud Agents → Environments → (your dejoiy-desk environment) → Secrets"
echo "Use exact names: DEJOIY_DEPLOY_HOST, DEJOIY_DEPLOY_USER, DEJOIY_DEPLOY_PASSWORD, DEJOIY_DEPLOY_FQDN"
echo "Then start a NEW Cloud Agent run (secrets do not load mid-conversation)."
exit 1
