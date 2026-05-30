#!/usr/bin/env bash
# Used by Cursor Cloud Agent when DEJOIY_DEPLOY_* secrets are set.
set -euo pipefail

# Accept common misnamed secrets (prefer exact DEJOIY_* names)
export DEJOIY_DEPLOY_HOST="${DEJOIY_DEPLOY_HOST:-${DEPLOY_HOST:-${HOST:-}}}"
export DEJOIY_DEPLOY_USER="${DEJOIY_DEPLOY_USER:-${DEPLOY_USER:-root}}"
export DEJOIY_DEPLOY_PASSWORD="${DEJOIY_DEPLOY_PASSWORD:-${DEPLOY_PASSWORD:-${PASSWORD:-}}}"
export DEJOIY_DEPLOY_FQDN="${DEJOIY_DEPLOY_FQDN:-${DEPLOY_FQDN:-${FQDN:-desk.dejoiy.internal}}}"

if [[ -z "${DEJOIY_DEPLOY_HOST:-}" ]]; then
  cat >&2 <<'EOF'
ERROR: DEJOIY deploy secrets are not available in this agent session.

Add these in Cursor → Cloud Agents → your Environment → Secrets (environment-scoped):
  DEJOIY_DEPLOY_HOST, DEJOIY_DEPLOY_USER, DEJOIY_DEPLOY_PASSWORD, DEJOIY_DEPLOY_FQDN

Then start a NEW Cloud Agent run (secrets do not reload mid-conversation).

Or on the server: curl -fsSL "https://raw.githubusercontent.com/partnersdejoiy-hash/dejoiy-desk/cursor/dejoiy-complete-rebrand-35c2/deploy/scripts/bootstrap-server.sh" | bash -s -- --fqdn desk.dejoiy.internal
EOF
  exit 1
fi
: "${DEJOIY_DEPLOY_HOST:?}"
: "${DEJOIY_DEPLOY_USER:?Set DEJOIY_DEPLOY_USER secret (e.g. root)}"
: "${DEJOIY_DEPLOY_FQDN:?Set DEJOIY_DEPLOY_FQDN secret (e.g. desk.dejoiy.internal)}"

if [[ -z "${DEJOIY_DEPLOY_SSH_KEY:-}" && -z "${DEJOIY_DEPLOY_PASSWORD:-}" ]]; then
  echo "Set either DEJOIY_DEPLOY_SSH_KEY or DEJOIY_DEPLOY_PASSWORD in Cursor secrets."
  exit 1
fi

REMOTE_REPO="${DEJOIY_DEPLOY_REPO_PATH:-/opt/dejoiy-desk}"
REPO_URL="${DEJOIY_DEPLOY_REPO_URL:-https://github.com/partnersdejoiy-hash/dejoiy-desk.git}"
BRANCH="${DEJOIY_DEPLOY_BRANCH:-cursor/dejoiy-complete-rebrand-35c2}"
PURGE_FLAG=""
[[ "${DEJOIY_PURGE_OLD_ZAMMAD:-false}" == "true" ]] && PURGE_FLAG="--purge-old-zammad"

SSH_BASE_OPTS=(-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null)

run_ssh() {
  if [[ -n "${DEJOIY_DEPLOY_SSH_KEY:-}" ]]; then
    local key_file
    key_file="$(mktemp)"
    trap 'rm -f "$key_file"' RETURN
    printf '%s\n' "$DEJOIY_DEPLOY_SSH_KEY" > "$key_file"
    chmod 600 "$key_file"
    ssh "${SSH_BASE_OPTS[@]}" -o BatchMode=yes -i "$key_file" "$@"
  else
    if ! command -v sshpass >/dev/null 2>&1; then
      echo "Installing sshpass for password-based SSH..."
      sudo apt-get update -qq && sudo apt-get install -y sshpass
    fi
    SSHPASS="$DEJOIY_DEPLOY_PASSWORD" sshpass -e ssh "${SSH_BASE_OPTS[@]}" \
      -o PreferredAuthentications=password -o PubkeyAuthentication=no "$@"
  fi
}

echo "Connecting to ${DEJOIY_DEPLOY_USER}@${DEJOIY_DEPLOY_HOST}..."

run_ssh "${DEJOIY_DEPLOY_USER}@${DEJOIY_DEPLOY_HOST}" bash -s <<REMOTE
set -euo pipefail
if [[ ! -d "$REMOTE_REPO/.git" ]]; then
  mkdir -p "$(dirname "$REMOTE_REPO")"
  git clone "$REPO_URL" "$REMOTE_REPO"
fi
cd "$REMOTE_REPO"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH" || true
chmod +x deploy/scripts/*.sh
./deploy/scripts/full-deploy.sh --fqdn "$DEJOIY_DEPLOY_FQDN" --yes $PURGE_FLAG
REMOTE

echo "Remote deployment finished. Verify: https://${DEJOIY_DEPLOY_FQDN}/"
