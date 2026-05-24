// Copyright (C) 2024-2026 Dejoiy

import registerIncomingTypeMerge from '../utils/registerIncomingTypeMerge.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig) {
  return registerIncomingTypeMerge(config, 'Overview', ['viewColumns', 'orderColumns'])
}
