// Copyright (C) 2024-2026 Dejoiy

import { keyBy } from 'lodash-es'

import type { UserTaskbarTabPlugin } from '../types.ts'

const plugins = import.meta.glob<UserTaskbarTabPlugin>(
  ['./**/*.ts', '!./**/index.ts', '!./types.ts', '!./__tests__/**/*.ts'],
  {
    eager: true,
    import: 'default',
  },
)

export const userTaskbarTabPlugins = Object.values(plugins)
export const userTaskbarTabPluginByType = keyBy(userTaskbarTabPlugins, 'type')
