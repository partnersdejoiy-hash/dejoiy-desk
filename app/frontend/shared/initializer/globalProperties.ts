// Copyright (C) 2024-2026 Dejoiy

import { i18n } from '#shared/i18n.ts'

import applicationConfigPlugin from '../plugins/applicationConfigPlugin.ts'

import type { App } from 'vue'

export default function initializeGlobalProperties(app: App): void {
  app.config.globalProperties.i18n = i18n
  app.config.globalProperties.$t = i18n.t.bind(i18n)

  app.use(applicationConfigPlugin)

  app.config.globalProperties.__ = window.__
}
