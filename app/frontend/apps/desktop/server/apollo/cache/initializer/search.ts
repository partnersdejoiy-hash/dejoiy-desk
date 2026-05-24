// Copyright (C) 2024-2026 Dejoiy

import registerOffsetStylePagination from '#shared/server/apollo/cache/utils/registerOffsetStylePagination.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig) {
  return registerOffsetStylePagination(config, 'search', [
    'onlyIn',
    'search',
    'orderBy',
    'orderDirection',
  ])
}
