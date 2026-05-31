# Copyright (C) 2024-2026 Dejoiy

class DejoiyProductNameServiceDesk < ActiveRecord::Migration[7.2]
  NEW_NAME = 'Service Desk for DEJOIY'.freeze
  LEGACY_NAMES = [
    'DEJOIY Internal Tools',
    'Zammad',
    'Zammad Helpdesk',
    'Zammad Demo System',
  ].freeze

  def up
    return if !Setting.exists?(name: 'product_name')

    current = Setting.get('product_name').to_s
    return if current.present? && LEGACY_NAMES.exclude?(current)

    Setting.set('product_name', NEW_NAME)
  end

  def down
    # Intentionally no-op — keep renamed product unless changed in admin UI.
  end
end
