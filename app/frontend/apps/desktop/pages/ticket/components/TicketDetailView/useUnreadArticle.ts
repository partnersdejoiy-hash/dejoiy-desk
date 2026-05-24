// Copyright (C) 2024-2026 Dejoiy

import { computed, reactive, watch, type Ref } from 'vue'

export const useUnreadArticle = <T>({ cleanupDependency }: { cleanupDependency: Ref<T> }) => {
  const newArticleIds = reactive(new Set())

  watch(cleanupDependency, () => {
    if (!newArticleIds.size) return
    newArticleIds.clear()
  })

  const addUnreadArticle = (articleId: string) => newArticleIds.add(articleId)

  const hasUnreadArticle = computed(() => newArticleIds.size > 0)

  const articleCount = computed(() => newArticleIds.size)

  return { articleCount, hasUnreadArticle, addUnreadArticle }
}
