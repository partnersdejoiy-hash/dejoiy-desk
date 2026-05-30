class Maintenance extends App.Controller
  serverRestarted: false
  constructor: ->
    super
    @controllerBind(
      'maintenance'
      (data) =>
        switch data.type
          when 'message'
            @showMessage(data)
          when 'mode'
            @maintenanceMode(data)
          when 'app_version'
            @maintenanceAppVersion(data)
          when 'config_changed'
            @maintenanceConfigChanged(data)
          when 'invalid_csrf_token'
            @maintenanceInvalidCSRFToken(data)
          when 'restart_auto'
            @maintenanceRestartAuto(data)
          when 'restart_manual'
            @maintenanceRestartManual(data)
          when 'force_refresh'
            @maintenanceForceRefresh(data)
    )

  showMessage: (message = {}) =>
    if message.reload
      @disconnectClient()
      button = __('Continue session')
    else
      button = __('Close')

    if message.reload
      App.SessionStorage.clear()

    new App.SessionMessage(
      head:          message.head
      contentInline: message.message
      small:         true
      keyboard:      true
      backdrop:      true
      buttonClose:   true
      buttonSubmit:  button
      forceReload:   message.reload
    )

  maintenanceMode: (data = {}) =>
    return if data.on isnt true
    return if !@authenticateCheck()
    @navigate '#logout'

  #App.Event.trigger('maintenance', {type:'restart_auto'})
  maintenanceRestartAuto: (data) =>
    return if @messageRestartAuto

    App.SessionStorage.clear()

    product = App.Config.get('product_name')
    @messageRestartAuto = new App.SessionMessage(
      head:         App.i18n.translateContent('%s is restarting…', product)
      message:      App.i18n.translateContent('Some system settings have changed, %s is restarting. Please wait until %s is back again.', product, product)
      keyboard:     false
      backdrop:     false
      buttonClose:  false
      buttonSubmit: false
      small:        true
      forceReload:  true
    )
    @disconnectClient()
    @checkAvailability()

  #App.Event.trigger('maintenance', {type:'restart_manual'})
  maintenanceRestartManual: (data) =>
    return if @messageRestartManual

    App.SessionStorage.clear()

    product = App.Config.get('product_name')
    @messageRestartManual = new App.SessionMessage(
      head:         App.i18n.translateContent('%s requires a restart!', product)
      message:      App.i18n.translateContent('Some system settings have changed, please restart all %s processes!', product)
      keyboard:     false
      backdrop:     false
      buttonClose:  false
      buttonSubmit: false
      small:        true
      forceReload:  true
    )
    @disconnectClient()
    @checkAvailability()

  maintenanceForceRefresh: (data) =>
    return if @forceRefreshed
    @forceRefreshed = true

    window.location.reload()

  maintenanceConfigChanged: (data) =>
    return if @messageConfigChanged

    App.SessionStorage.clear()

    @messageConfigChanged = new App.SessionMessage(
      head:          __('Config has changed')
      message:       App.i18n.translateContent('The configuration of %s has changed, please reload your browser.', App.Config.get('product_name'))
      keyboard:      false
      backdrop:      true
      buttonClose:   false
      buttonSubmit:  __('Continue session')
      forceReload:   true
    )

  maintenanceInvalidCSRFToken: (data) =>
    return if @messageConfigChanged

    App.SessionStorage.clear()

    @messageConfigChanged = new App.SessionMessage(
      head:          __('Security token verification failed')
      message:       __('The included security token is invalid. This may be just a temporary error, please reload your browser, and try again.')
      keyboard:      false
      backdrop:      true
      buttonClose:   false
      buttonSubmit:  __('Reload')
      forceReload:   true
      reloadTimeout: 10000
    )

  maintenanceAppVersion: (data) =>
    return if @messageAppVersion
    return if @appVersion is data.app_version
    if !@appVersion
      @appVersion = data.app_version
      return
    @appVersion = data.app_version

    App.SessionStorage.clear()

    message = =>
      @messageAppVersion = new App.SessionMessage(
        head:         __('New Version')
        message:      App.i18n.translateContent('A new version of %s is available, please reload your browser.', App.Config.get('product_name'))
        keyboard:     false
        backdrop:     true
        buttonClose:  false
        buttonSubmit: __('Continue session')
        forceReload:  true
      )
    @delay(message, 2000)

  checkAvailability: (timeout) =>
    delay = =>
      @ajax(
        id:      'check_availability'
        type:    'get'
        url:     "#{@apiPath}/available"
        success: (data) =>
          if @serverRestarted
            @windowReload()
            return

          @checkAvailability()
        error: =>
          @serverRestarted = true
          @checkAvailability(2000)
      )

    timeout ?= 1000
    @delay(delay, timeout)

App.Config.set('maintenance', Maintenance, 'Plugins')
