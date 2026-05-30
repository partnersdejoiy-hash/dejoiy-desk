#!/usr/bin/env bash
# Paste this ONCE on your Linux server (as root) — installs everything.
#
#   curl -fsSL "https://raw.githubusercontent.com/partnersdejoiy-hash/dejoiy-desk/cursor/dejoiy-complete-rebrand-35c2/deploy/scripts/bootstrap-server.sh" | bash -s -- --fqdn desk.dejoiy.internal
#
set -euo pipefail

FQDN=""
PURGE_OLD=false
REPO_DIR="/opt/dejoiy-desk"
BRANCH="cursor/dejoiy-complete-rebrand-35c2"
REPO_URL="https://github.com/partnersdejoiy-hash/dejoiy-desk.git"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --fqdn) FQDN="$2"; shift 2 ;;
    --purge-old-zammad) PURGE_OLD=true; shift ;;
    -h|--help)
      echo "Usage: bootstrap-server.sh --fqdn desk.dejoiy.internal [--purge-old-zammad]"
      exit 0
      ;;
    *) echo "Unknown: $1"; exit 1 ;;
  esac
done

[[ -n "$FQDN" ]] || { echo "Error: --fqdn required"; exit 1; }

echo "=== DEJOIY bootstrap on $(hostname) ==="

if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  apt-get update -qq
  apt-get install -y ca-certificates curl git
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker compose plugin missing. Install docker-compose-plugin."
  exit 1
fi

if [[ -d "$REPO_DIR/.git" ]]; then
  echo "Updating $REPO_DIR ..."
  git -C "$REPO_DIR" fetch origin
  git -C "$REPO_DIR" checkout "$BRANCH"
  git -C "$REPO_DIR" pull origin "$BRANCH" || true
else
  echo "Cloning into $REPO_DIR ..."
  mkdir -p "$(dirname "$REPO_DIR")"
  git clone --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
chmod +x deploy/scripts/*.sh

PURGE_ARGS=()
[[ "$PURGE_OLD" == true ]] && PURGE_ARGS+=(--purge-old-zammad)

exec ./deploy/scripts/full-deploy.sh --fqdn "$FQDN" --yes "${PURGE_ARGS[@]}"
