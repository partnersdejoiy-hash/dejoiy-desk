# Copyright (C) 2024-2026 Dejoiy

class DejoiyScrubZammadTranslations < ActiveRecord::Migration[7.2]
  SCRUB = lambda do |text|
    return text if text.blank?

    text
      .gsub('Zammad Helpdesk', 'Service Desk for DEJOIY')
      .gsub('Zammad Demo System', 'Service Desk for DEJOIY')
      .gsub('Zammad Foundation', 'DEJOIY')
      .gsub('Zammad GmbH', 'DEJOIY')
      .gsub(/\bZammad\b/, 'Service Desk for DEJOIY')
  end

  def up
    return if !table_exists?(:translations)

    Translation.where('source ILIKE :q OR target ILIKE :q OR target_initial ILIKE :q', q: '%zammad%')
               .find_each do |translation|
      changed = false
      %i[source target target_initial].each do |attr|
        value = translation[attr]
        next if value.blank?

        scrubbed = SCRUB.call(value)
        next if scrubbed == value

        translation[attr] = scrubbed
        changed = true
      end
      translation.save! if changed
    end
  end

  def down
    # Intentionally no-op.
  end
end
