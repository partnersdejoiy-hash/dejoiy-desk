// Copyright (C) 2024-2026 Dejoiy

import type { DetailViewActionPlugin } from '#desktop/types/actions.ts'

const pluginModules = import.meta.glob<DetailViewActionPlugin>(
  ['./*.ts', '!./index.ts', '!./types.ts'],
  {
    eager: true,
    import: 'default',
  },
)

const sortedActionPlugins = Object.values(pluginModules).sort((p1, p2) => p1.order - p2.order)

const topLevelActions: DetailViewActionPlugin[] = []

const secondLevelActions: DetailViewActionPlugin[] = []

sortedActionPlugins.forEach((plugin) =>
  plugin.topLevel ? topLevelActions.push(plugin) : secondLevelActions.push(plugin),
)

export const initializeActionPlugins = () => {
  sortedActionPlugins.forEach((plugin) => plugin.initialize?.())

  return { topLevelActions, secondLevelActions }
}
