// Copyright (C) 2024-2026 Dejoiy

import type { App } from 'vue'

let appInstance: App

export const setCurrentApp = (app: App) => {
  appInstance = app
}

export const getCurrentApp = () => {
  return appInstance
}
