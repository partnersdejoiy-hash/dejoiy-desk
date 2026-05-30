#!/usr/bin/env bash
# Removes a legacy Zammad Docker stack from this server.
# Does NOT touch DEJOIY volumes (dejoiy-*). Always review output before confirming.
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}DEJOIY — Legacy Zammad removal${NC}"
echo "This script stops and removes common Zammad Compose projects."
echo "Your new stack uses separate volumes: dejoiy-postgresql-data, dejoiy-storage, etc."
echo ""

if [[ "${1:-}" != "--yes" ]]; then
  echo -e "${RED}WARNING:${NC} This deletes old Zammad containers and optionally its volumes (all old tickets/email data)."
  echo "Back up first if you need to migrate data:"
  echo "  pg_dump + copy storage volume from the old stack"
  echo ""
  read -r -p "Type REMOVE-ZAMMAD to continue: " confirm
  if [[ "$confirm" != "REMOVE-ZAMMAD" ]]; then
    echo "Aborted."
    exit 1
  fi
fi

remove_compose_project() {
  local dir="$1"
  if [[ -f "$dir/docker-compose.yml" ]] || [[ -f "$dir/compose.yml" ]]; then
    echo -e "${GREEN}→${NC} Stopping project in: $dir"
    (cd "$dir" && docker compose down -v --remove-orphans 2>/dev/null) || \
    (cd "$dir" && docker-compose down -v --remove-orphans 2>/dev/null) || true
  fi
}

# Common install locations
CANDIDATES=(
  "$HOME/zammad-docker-compose"
  "/opt/zammad-docker-compose"
  "/var/www/zammad-docker-compose"
  "./zammad-docker-compose"
)

for dir in "${CANDIDATES[@]}"; do
  [[ -d "$dir" ]] && remove_compose_project "$dir"
done

# Stop containers by name pattern (official stack naming)
echo -e "${GREEN}→${NC} Removing containers matching zammad..."
docker ps -a --format '{{.Names}}' | grep -iE '^zammad|zammad-' | while read -r name; do
  docker rm -f "$name" 2>/dev/null || true
done

# Optional: remove old zammad volumes (NOT dejoiy-*)
echo -e "${GREEN}→${NC} Listing legacy Zammad volumes (dejoiy-* are kept):"
docker volume ls --format '{{.Name}}' | grep -i zammad | grep -vi dejoiy || true

if [[ "${2:-}" == "--purge-volumes" ]]; then
  docker volume ls --format '{{.Name}}' | grep -iE 'zammad' | grep -viE 'dejoiy' | while read -r vol; do
    echo "  removing volume: $vol"
    docker volume rm "$vol" 2>/dev/null || true
  done
else
  echo ""
  echo "Volumes were NOT deleted. To delete old Zammad data volumes after backup:"
  echo "  $0 --yes --purge-volumes"
fi

echo ""
echo -e "${GREEN}Done.${NC} Legacy Zammad containers should be gone. Deploy DEJOIY with:"
echo "  ./deploy/scripts/install-dejoiy.sh"
