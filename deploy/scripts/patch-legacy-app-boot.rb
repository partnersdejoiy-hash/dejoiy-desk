#!/usr/bin/env ruby
# frozen_string_literal: true
# Hotfix compiled legacy JS until image is rebuilt (class-level App.i18n crashes boot).

path = Dir.glob('/opt/zammad/public/assets/application-*.js').first
abort 'no application.js' unless path

s = File.read(path)
replacements = [
  [
    'e.prototype.description=App.i18n.translateContent("This service allows you to connect %s with an AI provider.",App.Config.get("product_name"))',
    'e.prototype.description="This service allows you to connect the service desk with an AI provider."'
  ],
  [
    '[[App.i18n.translateContent("This service enables %s to connect with your Exchange server.",App.Config.get("product_name"))]]',
    '[["This service enables the service desk to connect with your Exchange server."]]'
  ],
  [
    'e.prototype.head=App.i18n.translateContent("Help to improve %s!",App.Config.get("product_name"))',
    'e.prototype.head="Help to improve the service desk!"'
  ],
  [
    'text:App.i18n.translateContent("Hey! %s is getting a New Agent User Interface soon!\xb6Please try it out early and send your feedback on it.\xb6\xb6You can come back any time using the switch below.",App.Config.get("product_name"))',
    'text:"Hey! The service desk is getting a New Agent User Interface soon!\xb6Please try it out early and send your feedback on it.\xb6\xb6You can come back any time using the switch below."'
  ]
]

replacements.each do |from, to|
  s = s.gsub(from, to) if s.include?(from)
end

File.write(path, s)
puts "Patched #{path}"
