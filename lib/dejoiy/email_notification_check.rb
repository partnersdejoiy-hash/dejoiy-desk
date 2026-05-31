# Copyright (C) 2024-2026 Dejoiy

module Dejoiy
  # Warn when Docker deployments still use sendmail for outbound notifications.
  module EmailNotificationCheck
    module_function

    def warn_if_sendmail_active
      return if Rails.env.test?
      return if ENV['DEJOIY_SKIP_EMAIL_CHECK'] == 'true'

      begin
        return unless ActiveRecord::Base.connection.table_exists?('channels')
      rescue StandardError
        return
      end

      channel = Channel.find_by(area: 'Email::Notification', active: true)
      return if channel.blank?

      adapter = channel.options.dig(:outbound, :adapter).to_s
      return if adapter.blank? || adapter != 'sendmail'

      Rails.logger.warn(
        '[DEJOIY] Outbound email uses sendmail (Local MTA). Password reset and verification emails ' \
        'will not reach real inboxes in Docker. Configure SMTP under Admin → Channels → Email → Notification. ' \
        'See deploy/EMAIL.md'
      )
    end
  end
end

Rails.application.config.after_initialize do
  Dejoiy::EmailNotificationCheck.warn_if_sendmail_active
end
