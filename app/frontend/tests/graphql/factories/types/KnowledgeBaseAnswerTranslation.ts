// Copyright (C) 2024-2026 Dejoiy

import { type KnowledgeBaseAnswerTranslation } from '#shared/graphql/types.ts'
import { convertToGraphQLId } from '#shared/graphql/utils.ts'
import type { DeepPartial } from '#shared/types/utils.ts'

export default (): DeepPartial<KnowledgeBaseAnswerTranslation> => {
  return {
    __typename: 'KnowledgeBaseAnswerTranslation',
    id: convertToGraphQLId('KnowledgeBase::Answer::Translation', 999),
    title: 'Knowledge Base Answer Translation Title',
    categoryTreeTranslation: [
      {
        __typename: 'KnowledgeBaseCategoryTranslation',
        id: convertToGraphQLId('KnowledgeBase::Category::Translation', 999),
        title: 'Knowledge Base Category Translation Title',
        category: {
          __typename: 'KnowledgeBaseCategory',
          id: convertToGraphQLId('KnowledgeBase::Category', 999),
        },
      },
    ],
  }
}
