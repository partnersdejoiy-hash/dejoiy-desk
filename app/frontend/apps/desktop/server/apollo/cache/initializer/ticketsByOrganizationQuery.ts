// Copyright (C) 2024-2026 Dejoiy

import registerRelayStylePagination from '#shared/server/apollo/cache/utils/registerRelayStylePagination.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig): InMemoryCacheConfig {
  return registerRelayStylePagination(config, 'ticketsByOrganization', [
    'organizationId',
    'stateTypeCategory',
  ])
}
