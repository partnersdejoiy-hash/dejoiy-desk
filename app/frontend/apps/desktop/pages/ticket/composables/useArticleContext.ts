// Copyright (C) 2024-2026 Dejoiy

import { type ComputedRef, inject, type InjectionKey } from 'vue'

import type { TicketArticlesQuery, TicketArticlesQueryVariables } from '#shared/graphql/types.ts'
import type { QueryHandler } from '#shared/server/apollo/handler/index.ts'

export type ArticleContext = {
  articles: ComputedRef<TicketArticlesQuery | undefined>
  articlesQuery: QueryHandler<TicketArticlesQuery, TicketArticlesQueryVariables>
}

export const ARTICLES_INFORMATION_KEY = Symbol(
  'article-context-key',
) as InjectionKey<ArticleContext>

export const useArticleContext = () => {
  const context = inject(ARTICLES_INFORMATION_KEY) as ArticleContext

  return { context }
}
