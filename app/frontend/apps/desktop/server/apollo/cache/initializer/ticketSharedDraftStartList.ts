// Copyright (C) 2024-2026 Dejoiy

import registerIncomingQueryMergeMerge from '#shared/server/apollo/cache/utils/registerIncomingQueryMerge.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig) {
  return registerIncomingQueryMergeMerge(config, 'ticketSharedDraftStartList')
}
