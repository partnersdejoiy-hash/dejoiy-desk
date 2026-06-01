#!/usr/bin/env bash
# Configure DEJOIY organization, agents, admin, branding, and nginx proxy on a running stack.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$DEPLOY_DIR"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

"${SCRIPT_DIR}/patch-nginx-forwarded-proto.sh"

export DEJOIY_FQDN="${ZAMMAD_FQDN:-desk.dejoiy.com}"
export DEJOIY_HTTP_TYPE="${ZAMMAD_HTTP_TYPE:-https}"

docker compose exec -T dejoiy-railsserver bundle exec rake dejoiy:branding:sync 2>/dev/null || true

if [[ -n "${DEJOIY_ADMIN_PASSWORD:-}" ]]; then
  docker compose exec -T dejoiy-railsserver bundle exec rake dejoiy:admin:ensure \
    LOGIN="${DEJOIY_ADMIN_LOGIN:-admin}" \
    EMAIL="${DEJOIY_ADMIN_EMAIL:-admin@dejoiy.internal}" \
    PASSWORD="${DEJOIY_ADMIN_PASSWORD}"
fi

docker compose exec -T dejoiy-railsserver bundle exec rake dejoiy:company:setup \
  AGENTS="${DEJOIY_AGENTS:-core@dejoiy.com,anil.sharma@dejoiy.com}" \
  ${DEJOIY_AGENT_PASSWORD:+PASSWORD=$DEJOIY_AGENT_PASSWORD}

echo "Done. Open https://${DEJOIY_FQDN}/ and sign in as an agent."
