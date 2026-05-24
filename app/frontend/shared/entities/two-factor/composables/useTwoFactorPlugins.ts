// Copyright (C) 2024-2026 Dejoiy

import { keyBy } from 'lodash-es'

import { twoFactorPluginsFiles } from './initializeTwoFactorPlugins.ts'

const plugins = twoFactorPluginsFiles
const pluginListLookup = keyBy(plugins, 'name')

export const useTwoFactorPlugins = () => {
  return {
    twoFactorMethods: plugins,
    twoFactorMethodLookup: pluginListLookup,
  }
}
