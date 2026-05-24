// Copyright (C) 2024-2026 Dejoiy

import type { SearchQuery } from '#shared/graphql/types.ts'
import type { ConfidentTake } from '#shared/types/utils.ts'
import { mockGraphQLApi } from '#tests/support/mock-graphql-api.ts'
import { SearchDocument } from '../queries/searchOverview.api.ts'

export const mockSearchOverview = (search: ConfidentTake<SearchQuery, 'search'>) => {
  return mockGraphQLApi(SearchDocument).willResolve({
    search,
  })
}
