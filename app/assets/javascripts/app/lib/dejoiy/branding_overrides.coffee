# Copyright (C) 2024-2026 Dejoiy
# Runtime overrides: docs links, product name, and vendor strings in legacy UI.

PRODUCT_NAME = 'Service Desk for DEJOIY'

scrubVendorName = (text) ->
  return text if !text || typeof text isnt 'string'
  text
    .replace(/Zammad GmbH/g, 'DEJOIY')
    .replace(/Zammad Foundation/g, 'DEJOIY')
    .replace(/Zammad Helpdesk/g, PRODUCT_NAME)
    .replace(/Zammad Demo System/g, PRODUCT_NAME)
    .replace(/\bZammad\b/g, PRODUCT_NAME)

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

  current = App.Config.get('product_name')
  if !current || current.indexOf('Zammad') >= 0 || current is 'DEJOIY Internal Tools'
    App.Config.set('product_name', PRODUCT_NAME)

  # Model help text shown in admin (object manager / model info).
  modelDescriptions =
    'Macro': """
      Macros make it easy to automate common, multi-step tasks within the service desk.
      You can use macros to automate recurring sequences, saving time. A combined sequence of actions on a ticket can be executed with one click.
    """
    'Webhook': """
      Webhooks send information about events in the service desk to third-party systems via HTTP(S).
      Configure a webhook with an endpoint and security settings, then attach it to a trigger.
    """
    'Trigger': """
      Triggers run automated actions when tickets change—for example sending a confirmation email when a customer creates a ticket.
    """
    'PublicLink': """
      Links shown on the login screen (for example privacy policy or support pages) for people using your service desk.
    """
    'Sla': """
      **Service Level Agreements (SLAs)** help you meet response-time goals. If a target is at risk, the service desk alerts you.
    """

  for modelName, description of modelDescriptions
    model = App[modelName]
    continue if !model?.description
    model.description = description

  # Patch i18n translate for legacy English strings that still say "Zammad" in the catalog.
  if App.i18n?.translate? && !App.i18n.__dejoiyScrubPatched
    App.i18n.__dejoiyScrubPatched = true
    originalTranslate = App.i18n.translate
    App.i18n.translate = (string, args...) ->
      result = originalTranslate.call(App.i18n, string, args...)
      scrubVendorName(result)
