// Copyright (C) 2024-2026 Dejoiy

import registerRedirect from '#shared/server/apollo/cache/utils/registerRedirect.ts'

import type { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'

export default function register(config: InMemoryCacheConfig) {
  return registerRedirect(config, 'userId', 'User')
}
