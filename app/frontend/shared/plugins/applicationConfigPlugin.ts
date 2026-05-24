// Copyright (C) 2024-2026 Dejoiy

import { toRef, unref } from 'vue'

import { useApplicationStore } from '#shared/stores/application.ts'
import type { ConfigList } from '#shared/types/store.ts'

import type { App } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $c: ConfigList
  }
}

const applicationConfigPlugin = (app: App) => {
  const application = useApplicationStore()
  const config = toRef(application, 'config')

  Object.defineProperty(app.config.globalProperties, '$c', {
    enumerable: true,
    get: () => unref(config),
  })
}

export default applicationConfigPlugin
