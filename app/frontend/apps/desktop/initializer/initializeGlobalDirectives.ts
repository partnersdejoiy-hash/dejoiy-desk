// Copyright (C) 2024-2026 Dejoiy

import { type App } from 'vue'

import { initializeTooltipDirective } from '#shared/initializer/initializeDirectives.ts'

const initializeGlobalDirectives = (app: App) => {
  initializeTooltipDirective(app)
}

export default initializeGlobalDirectives
