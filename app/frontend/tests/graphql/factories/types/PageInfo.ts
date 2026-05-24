// Copyright (C) 2024-2026 Dejoiy

import type { PageInfo } from '#shared/graphql/types.ts'
import type { DeepPartial } from '#shared/types/utils.ts'

export default (parent?: any): DeepPartial<PageInfo> => {
  const edgesLength = parent?.edges?.length ?? 0
  const last = parent.edges?.[edgesLength - 1]?.cursor ?? null
  const first = parent.edges?.[0]?.cursor ?? null
  return {
    endCursor: last,
    startCursor: first,
    hasNextPage: false,
    hasPreviousPage: false,
  }
}
