// Copyright (C) 2024-2026 Dejoiy

import { createI18nPlugin as formKitCreateI18nPlugin } from '@formkit/i18n'
import { reactive } from 'vue'

import loadLocales from '#shared/form/i18n/locales.ts'

import { getValidationRuleMessages } from './createValidationPlugin.ts'

import type { FormKitPlugin } from '@formkit/core'

const createI18nPlugin = (): FormKitPlugin => {
  const staticLocale = reactive(loadLocales())

  Object.assign(staticLocale.validation, getValidationRuleMessages())

  return formKitCreateI18nPlugin({ staticLocale })
}

export default createI18nPlugin
