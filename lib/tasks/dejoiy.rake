# Copyright (C) 2024-2026 Dejoiy

namespace :dejoiy do
  namespace :admin do
    desc 'Create or update super admin. LOGIN=admin EMAIL=admin@example.com PASSWORD=secret [FIRSTNAME] [LASTNAME]'
    task ensure: :environment do
      login = ENV['LOGIN'].presence || ENV['DEJOIY_ADMIN_LOGIN'].presence || 'admin'
      email = ENV['EMAIL'].presence || ENV['DEJOIY_ADMIN_EMAIL'].presence || login
      password = ENV['PASSWORD'].presence || ENV['DEJOIY_ADMIN_PASSWORD'].presence
      firstname = ENV['FIRSTNAME'].presence || ENV['DEJOIY_ADMIN_FIRSTNAME'].presence || 'DEJOIY'
      lastname = ENV['LASTNAME'].presence || ENV['DEJOIY_ADMIN_LASTNAME'].presence || 'Admin'

      abort 'Set PASSWORD= or DEJOIY_ADMIN_PASSWORD=' if password.blank?

      admin_roles = Role.where(name: %w[Admin Agent])
      groups = Group.all

      user = User.create_or_update(
        login:     login,
        email:     email,
        firstname: firstname,
        lastname:  lastname,
        password:  password,
        active:    true,
        roles:     admin_roles,
        groups:    groups,
      )
      puts "Admin user ##{user.id} ready (#{login})"

      Setting.set('system_init_done', true) if User.admin_user_exists?
      puts 'Done. Sign in with the login and password above.'
    end
  end

  namespace :email do
    desc 'Print outbound email / notification channel diagnostics'
    task diagnose: :environment do
      puts "FQDN:              #{Setting.get('fqdn')}"
      puts "HTTP type:         #{Setting.get('http_type')}"
      puts "Notification from: #{Setting.get('notification_sender')}"
      puts "Lost password:     #{Setting.get('user_lost_password')}"
      puts "New user signup:   #{Setting.get('user_create_account')}"
      puts "Import mode:       #{Setting.get('import_mode')}"

      Channel.where(area: 'Email::Notification').find_each do |channel|
        adapter = channel.options.dig(:outbound, :adapter)
        puts "Channel ##{channel.id} active=#{channel.active} adapter=#{adapter} status=#{channel.status_out}"
        puts "  last_log_out: #{channel.last_log_out}" if channel.last_log_out.present?
      end

      active = Channel.find_by(area: 'Email::Notification', active: true)
      if active.blank?
        puts "\nNo active Email::Notification channel — emails will not be sent."
      elsif active.options.dig(:outbound, :adapter).to_s == 'sendmail'
        puts "\nWARNING: sendmail active — use SMTP in Docker/production."
      end
    end

    desc 'Send a test notification email. Usage: rake dejoiy:email:test SEND_TO=you@example.com'
    task test: :environment do
      email = ENV['SEND_TO'].presence || ENV['EMAIL'].presence
      abort 'Set SEND_TO=email@example.com' if email.blank?

      user = User.find_by(email: email) || User.find_by(login: email)
      unless user
        abort "No user with email/login #{email}. Create a user or pass an admin email."
      end

      sample_url = "#{Setting.get('http_type')}://#{Setting.get('fqdn')}/desktop/reset-password/verify/sample-token"

      result = NotificationFactory::Mailer.notification(
        template: 'password_reset',
        user:     user,
        objects:  {
          url:   sample_url,
          token: OpenStruct.new(token: 'sample-token'),
          user:  user,
        },
      )

      if result
        puts "Test email sent to #{user.email} (password_reset template)."
      else
        puts 'Send returned false — check active Email::Notification channel and logs.'
        exit 1
      end
    end
  end
end
