// Copyright (C) 2024-2026 Dejoiy

import { type KnowledgeBaseCategory } from '#shared/graphql/types.ts'
import { convertToGraphQLId } from '#shared/graphql/utils.ts'
import type { DeepPartial } from '#shared/types/utils.ts'

export default (): DeepPartial<KnowledgeBaseCategory> => {
  return {
    __typename: 'KnowledgeBaseCategory',
    id: convertToGraphQLId('KnowledgeBase::Category', 999),
    parent: null,
    knowledgeBase: {
      __typename: 'KnowledgeBase',
      id: convertToGraphQLId('KnowledgeBase', 999),
    },
    translations: [],
  }
}
