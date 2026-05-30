# Copyright (C) 2024-2026 Dejoiy
# Runtime overrides for legacy UI vendor doc links and labels.

App.Event.bind 'app:ready', ->
  helpPath = '/help'

  for key in ['admin_docs', 'agent_docs']
    entry = App.Config.get(key)
    continue if !entry
    entry.name = App.i18n.translate('Help Center')
    entry.target = helpPath
    entry.external = false
    entry.iconClass = 'help'
    App.Config.set(key, entry)
