#!/usr/bin/env bash
# One-shot: remove legacy Zammad (optional) + install DEJOIY Internal Tools
# Run ON your portal server as root or a user in the docker group.
#
#   curl -fsSL .../full-deploy.sh | bash
#   — or —
#   ./deploy/scripts/full-deploy.sh --fqdn desk.dejoiy.com --purge-old-zammad
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$DEPLOY_DIR/.." && pwd)"

FQDN=""
HTTP_TYPE="https"
PURGE_OLD=false
SKIP_REMOVE=false
NONINTERACTIVE=false

usage() {
  cat <<'EOF'
Usage: full-deploy.sh [options]

  --fqdn HOST              Public hostname (e.g. desk.dejoiy.com) [required]
  --http-type http|https   Default: https
  --purge-old-zammad       Remove old Zammad volumes after stop (destructive)
  --skip-remove            Do not run legacy Zammad removal
  --yes                    Non-interactive (required with --purge-old-zammad)
  -h, --help

Example:
  ./deploy/scripts/full-deploy.sh --fqdn desk.dejoiy.com --yes
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --fqdn) FQDN="$2"; shift 2 ;;
    --http-type) HTTP_TYPE="$2"; shift 2 ;;
    --purge-old-zammad) PURGE_OLD=true; shift ;;
    --skip-remove) SKIP_REMOVE=true; shift ;;
    --yes) NONINTERACTIVE=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1"; usage; exit 1 ;;
  esac
done

if [[ -z "$FQDN" ]]; then
  echo "Error: --fqdn is required"
  usage
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Error: Docker is not installed. Install Docker Engine + Compose plugin first."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker compose (v2) is required."
  exit 1
fi

echo "=== DEJOIY full deployment ==="
echo "FQDN: $FQDN"
echo "Repo: $REPO_ROOT"
echo ""

cd "$REPO_ROOT"

if [[ "$SKIP_REMOVE" != true ]]; then
  if [[ "$PURGE_OLD" == true ]]; then
    if [[ "$NONINTERACTIVE" != true ]]; then
      echo "Add --yes with --purge-old-zammad for non-interactive mode"
      exit 1
    fi
    "$SCRIPT_DIR/uninstall-legacy-zammad.sh" --yes --purge-volumes
  else
    "$SCRIPT_DIR/uninstall-legacy-zammad.sh" --yes
  fi
fi

if [[ ! -f "$DEPLOY_DIR/.env" ]]; then
  cp "$DEPLOY_DIR/.env.example" "$DEPLOY_DIR/.env"
fi

# Generate password if placeholder
if grep -q 'CHANGE_ME_STRONG_PASSWORD' "$DEPLOY_DIR/.env" 2>/dev/null; then
  PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"
  sed -i "s/CHANGE_ME_STRONG_PASSWORD/${PASS}/" "$DEPLOY_DIR/.env"
  echo "Generated POSTGRES_PASS (saved in deploy/.env)"
fi

sed -i "s|^ZAMMAD_FQDN=.*|ZAMMAD_FQDN=${FQDN}|" "$DEPLOY_DIR/.env"
sed -i "s|^ZAMMAD_HTTP_TYPE=.*|ZAMMAD_HTTP_TYPE=${HTTP_TYPE}|" "$DEPLOY_DIR/.env"
sed -i 's|^DEJOIY_ENABLE_VENDOR_SERVICES=.*|DEJOIY_ENABLE_VENDOR_SERVICES=false|' "$DEPLOY_DIR/.env"

export COMMIT_SHA="${COMMIT_SHA:-$(git -C "$REPO_ROOT" rev-parse HEAD 2>/dev/null || echo local)}"

cd "$DEPLOY_DIR"
echo "=== Building image (10–20 min first time) ==="
docker compose build

echo "=== Starting stack ==="
docker compose up -d

echo "=== Waiting for healthy app (up to 10 min) ==="
for i in $(seq 1 60); do
  if docker compose ps dejoiy-railsserver 2>/dev/null | grep -q healthy; then
    echo "DEJOIY is healthy."
    break
  fi
  sleep 10
  echo "  ... still starting ($i/60)"
done

PORT="$(grep -E '^NGINX_EXPOSE_PORT=' .env | cut -d= -f2 || echo 8080)"
echo ""
echo "============================================"
echo " DEJOIY Internal Tools is deployed"
echo " Local:  http://127.0.0.1:${PORT}/"
echo " Public: ${HTTP_TYPE}://${FQDN}/  (after reverse proxy)"
echo " Privacy: vendor services DISABLED"
echo "============================================"
echo "Point nginx/Caddy to 127.0.0.1:${PORT} — see deploy/nginx-portal.example.conf"
