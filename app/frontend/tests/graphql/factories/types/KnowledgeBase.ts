// Copyright (C) 2024-2026 Dejoiy

import { type KnowledgeBase } from '#shared/graphql/types.ts'
import { convertToGraphQLId } from '#shared/graphql/utils.ts'
import type { DeepPartial } from '#shared/types/utils.ts'

export default (): DeepPartial<KnowledgeBase> => {
  return {
    __typename: 'KnowledgeBase',
    id: convertToGraphQLId('KnowledgeBase', 999),
  }
}
