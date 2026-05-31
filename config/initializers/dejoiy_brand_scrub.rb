# Copyright (C) 2024-2026 Dejoiy

# Ensure product_name never stays on vendor defaults after upgrades.
Rails.application.config.after_initialize do
  next if Rails.env.test? && ENV['VITE_TEST_MODE'].present?

  current = Setting.get('product_name').to_s
  next if current.present? && current !~ /zammad/i && current != 'DEJOIY Internal Tools'

  Setting.set('product_name', 'Service Desk for DEJOIY')
rescue StandardError => e
  Rails.logger.warn("dejoiy_brand_scrub skipped: #{e.message}")
end
