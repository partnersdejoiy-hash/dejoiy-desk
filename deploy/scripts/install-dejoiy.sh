#!/usr/bin/env bash
# Build and start DEJOIY Internal Tools (private stack).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$DEPLOY_DIR/.." && pwd)"

cd "$DEPLOY_DIR"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created deploy/.env — edit ZAMMAD_FQDN and POSTGRES_PASS before continuing."
  echo "Then re-run this script."
  exit 1
fi

# shellcheck disable=SC1091
source .env 2>/dev/null || true

if [[ -z "${AUTOWIZARD_JSON:-}" ]] && [[ -n "${DEJOIY_ADMIN_PASSWORD:-}" ]] \
  && [[ "${DEJOIY_ADMIN_PASSWORD}" != "CHANGE_ME_ON_FIRST_LOGIN" ]]; then
  echo "Generating AUTOWIZARD_JSON from DEJOIY_ADMIN_* in deploy/.env..."
  chmod +x "$SCRIPT_DIR/generate-autowizard.sh"
  "$SCRIPT_DIR/generate-autowizard.sh"
  # shellcheck disable=SC1091
  source .env 2>/dev/null || true
fi

export COMMIT_SHA="${COMMIT_SHA:-$(git -C "$REPO_ROOT" rev-parse HEAD 2>/dev/null || echo local)}"

echo "Building DEJOIY image (this may take several minutes)..."
docker compose -f docker-compose.yml build

echo "Starting DEJOIY stack..."
docker compose -f docker-compose.yml up -d

echo ""
echo "Waiting for init (database migrate/seed)..."
sleep 5
docker compose -f docker-compose.yml logs -f dejoiy-init &
LOG_PID=$!
for _ in $(seq 1 120); do
  if docker compose -f docker-compose.yml ps dejoiy-railsserver 2>/dev/null | grep -q healthy; then
    kill "$LOG_PID" 2>/dev/null || true
    break
  fi
  sleep 5
done
kill "$LOG_PID" 2>/dev/null || true

PORT="${NGINX_EXPOSE_PORT:-8080}"
FQDN="${ZAMMAD_FQDN:-desk.dejoiy.internal}"
echo ""
echo "DEJOIY Internal Tools is starting."
echo "  URL (local):  http://127.0.0.1:${PORT}/"
echo "  Configured FQDN: ${FQDN}"
if [[ -n "${AUTOWIZARD_JSON:-}" ]]; then
  echo "  First visit: automated setup (preset admin: ${DEJOIY_ADMIN_LOGIN:-admin})"
else
  echo "  First visit: manual setup wizard (or run generate-autowizard.sh for preset admin)"
fi
echo ""
echo "Privacy: DEJOIY_ENABLE_VENDOR_SERVICES=${DEJOIY_ENABLE_VENDOR_SERVICES:-false}"
echo "Point your portal reverse proxy to 127.0.0.1:${PORT}"
echo "See deploy/DEPLOY.md for nginx/Caddy examples."
