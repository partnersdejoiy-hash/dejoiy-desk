// Copyright (C) 2024-2026 Dejoiy

import registerNotNormalizedObjectFieldsMerge from '#shared/server/apollo/cache/utils/registerNotNormalizedObjectFieldsMerge.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig) {
  return registerNotNormalizedObjectFieldsMerge(config, 'Ticket', ['policy'])
}
