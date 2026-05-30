# Copyright (C) 2024-2026 Dejoiy

class DejoiyScrubSettingDescriptions < ActiveRecord::Migration[7.2]
  REPLACEMENTS = [
    [/instances of Zammad/, 'instances of this system'],
    [/log into Zammad/, 'log into the application'],
    [/his Zammad account/, 'their account'],
    [/versions of Zammad/, 'versions of the application'],
    [/outgoing emails from Zammad/, 'outgoing emails from the application'],
    [/Puts Zammad into/, 'Puts the application into'],
    [/auto replies from Zammad/, 'auto replies from the application'],
    [/created by Zammad itself/, 'created by the application itself'],
    [/operate Zammad in/, 'operate this system in'],
    [/self-shutdown of Zammad/, 'self-shutdown of application'],
    [/Zammad Image Service/, 'DEJOIY Image Service'],
    [/Zammad GeoIP Service/, 'DEJOIY GeoIP Service'],
    [/Zammad GeoCalendar Service/, 'DEJOIY GeoCalendar Service'],
  ].freeze

  def up
    return if !Setting.exists?(name: 'system_init_done')

    product = Setting.get('product_name').presence || 'DEJOIY Internal Tools'

    Setting.where('description LIKE ?', '%Zammad%').find_each do |setting|
      description = setting.description
      REPLACEMENTS.each do |pattern, replacement|
        description = description.gsub(pattern, replacement)
      end
      description = description.gsub('Zammad', product) unless setting.name == '0000_postmaster_filter_trusted'
      setting.update!(description: description) if description != setting.description
    end
  end
end
