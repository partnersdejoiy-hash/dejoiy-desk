#!/usr/bin/env bash
# Diagnose DEJOIY outbound email (notification channel) in Docker.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${DEPLOY_DIR}"

SERVICE="${DEJOIY_RAILS_SERVICE:-dejoiy-railsserver}"
SEND_TO="${1:-}"

if [[ "${1:-}" == "--send" ]]; then
  SEND_TO="${2:-}"
  if [[ -z "${SEND_TO}" ]]; then
    echo "Usage: $0 --send your@email.com" >&2
    exit 1
  fi
fi

echo "=== DEJOIY email diagnostics (service: ${SERVICE}) ==="

docker compose exec -T "${SERVICE}" bundle exec rails runner "
  puts 'FQDN:              ' + Setting.get('fqdn').to_s
  puts 'HTTP type:         ' + Setting.get('http_type').to_s
  puts 'Notification from: ' + Setting.get('notification_sender').to_s
  puts 'Lost password:     ' + Setting.get('user_lost_password').to_s
  puts 'New user signup:   ' + Setting.get('user_create_account').to_s
  puts 'Import mode:       ' + Setting.get('import_mode').to_s
  puts 'Developer mode:    ' + Setting.get('developer_mode').to_s
  puts ''

  channels = Channel.where(area: 'Email::Notification')
  active = channels.where(active: true)
  puts 'Email::Notification channels: ' + channels.count.to_s + ' (active: ' + active.count.to_s + ')'
  channels.each do |c|
    adapter = c.options.dig(:outbound, :adapter) || c.options[:adapter]
    puts \"  - id=#{c.id} active=#{c.active} adapter=#{adapter} status_out=#{c.status_out} last_log=#{c.last_log_out.to_s[0,120]}\"
  end

  if active.blank?
    puts ''
    puts 'PROBLEM: No active Email::Notification channel — password reset and verification emails are NOT sent.'
    puts 'FIX: Admin → Channels → Email → Notification → configure SMTP and activate it.'
  elsif active.any? { |c| c.options.dig(:outbound, :adapter).to_s == 'sendmail' }
    puts ''
    puts 'WARNING: Active channel uses sendmail. In Docker this usually does NOT deliver to real mailboxes.'
    puts 'FIX: Switch notification outbound to SMTP (Hostinger, SendGrid, etc.).'
  end
"

if [[ -n "${SEND_TO}" ]]; then
  echo ""
  echo "=== Sending test email to ${SEND_TO} ==="
  docker compose exec -T -e "SEND_TO=${SEND_TO}" "${SERVICE}" bundle exec rake dejoiy:email:test
fi

echo ""
echo "Done. See deploy/EMAIL.md for SMTP setup."
