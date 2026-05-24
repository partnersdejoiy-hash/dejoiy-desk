// Copyright (C) 2024-2026 Dejoiy

import { keyBy } from 'lodash-es'

import type { EnumChannelArea } from '#shared/graphql/types.ts'

import type { TicketChannelPlugin } from './types.ts'

const pluginModules = import.meta.glob<TicketChannelPlugin>(
  ['./*.ts', '!./initialize.ts', '!./types.ts', '!./__tests__/**/*.ts'],
  {
    eager: true,
    import: 'default',
  },
)

const ticketChannelPluginFiles = Object.values(pluginModules)
export const ticketChannelPlugins = keyBy(ticketChannelPluginFiles, 'area')

export const getTicketChannelPlugin = (ticketChannel?: Maybe<EnumChannelArea>) => {
  if (!ticketChannel) return null

  return ticketChannelPlugins[ticketChannel]
}
