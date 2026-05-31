# Copyright (C) 2024-2026 Dejoiy

# Warn when Docker deployments still use sendmail for outbound notifications.
Rails.application.config.after_initialize do
  next if Rails.env.test?
  next if ENV['DEJOIY_SKIP_EMAIL_CHECK'] == 'true'

  begin
    next unless ActiveRecord::Base.connection.table_exists?('channels')
  rescue StandardError
    next
  end

  channel = Channel.find_by(area: 'Email::Notification', active: true)
  next if channel.blank?

  adapter = channel.options.dig(:outbound, :adapter).to_s
  next if adapter.blank?
  next if adapter != 'sendmail'

  Rails.logger.warn(
    '[DEJOIY] Outbound email uses sendmail (Local MTA). Password reset and verification emails ' \
    'will not reach real inboxes in Docker. Configure SMTP under Admin → Channels → Email → Notification. ' \
    'See deploy/EMAIL.md'
  )
end
