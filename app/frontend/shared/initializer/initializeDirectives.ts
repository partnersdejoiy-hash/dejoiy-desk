// Copyright (C) 2024-2026 Dejoiy
import { type App } from 'vue'

import tooltip from '#shared/plugins/directives/tooltip/index.ts'

export const initializeTooltipDirective = (app: App) => {
  const { name, directive } = tooltip
  app.directive(name, directive)
}
