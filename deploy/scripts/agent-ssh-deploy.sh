#!/usr/bin/env bash
# Used by Cursor Cloud Agent when DEJOIY_DEPLOY_* secrets are set.
# Do not run manually unless those variables are exported.
set -euo pipefail

: "${DEJOIY_DEPLOY_HOST:?Set DEJOIY_DEPLOY_HOST secret}"
: "${DEJOIY_DEPLOY_USER:?Set DEJOIY_DEPLOY_USER secret}"
: "${DEJOIY_DEPLOY_SSH_KEY:?Set DEJOIY_DEPLOY_SSH_KEY secret (private key PEM)}"
: "${DEJOIY_DEPLOY_FQDN:?Set DEJOIY_DEPLOY_FQDN secret (public hostname)}"

KEY_FILE="$(mktemp)"
trap 'rm -f "$KEY_FILE"' EXIT
printf '%s\n' "$DEJOIY_DEPLOY_SSH_KEY" > "$KEY_FILE"
chmod 600 "$KEY_FILE"

SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o BatchMode=yes -i "$KEY_FILE")

REMOTE_REPO="${DEJOIY_DEPLOY_REPO_PATH:-/opt/dejoiy-desk}"
REPO_URL="${DEJOIY_DEPLOY_REPO_URL:-https://github.com/partnersdejoiy-hash/dejoiy-desk.git}"
BRANCH="${DEJOIY_DEPLOY_BRANCH:-cursor/dejoiy-complete-rebrand-35c2}"
PURGE_FLAG=""
[[ "${DEJOIY_PURGE_OLD_ZAMMAD:-false}" == "true" ]] && PURGE_FLAG="--purge-old-zammad"

echo "Connecting to ${DEJOIY_DEPLOY_USER}@${DEJOIY_DEPLOY_HOST}..."

ssh "${SSH_OPTS[@]}" "${DEJOIY_DEPLOY_USER}@${DEJOIY_DEPLOY_HOST}" bash -s <<REMOTE
set -euo pipefail
if [[ ! -d "$REMOTE_REPO/.git" ]]; then
  sudo mkdir -p "$(dirname "$REMOTE_REPO")"
  sudo git clone "$REPO_URL" "$REMOTE_REPO"
  sudo chown -R "\$(whoami):\$(whoami)" "$REMOTE_REPO"
fi
cd "$REMOTE_REPO"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH" || true
chmod +x deploy/scripts/*.sh
./deploy/scripts/full-deploy.sh --fqdn "$DEJOIY_DEPLOY_FQDN" --yes $PURGE_FLAG
REMOTE

echo "Remote deployment finished. Verify: https://${DEJOIY_DEPLOY_FQDN}/"
