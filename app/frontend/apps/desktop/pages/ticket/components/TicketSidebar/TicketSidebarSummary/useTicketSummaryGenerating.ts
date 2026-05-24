// Copyright (C) 2024-2026 Dejoiy

import { createGlobalState } from '@vueuse/shared'
import { readonly, shallowRef } from 'vue'

export const useTicketSummaryGenerating = createGlobalState(() => {
  const isSummaryGenerating = shallowRef(false)

  const updateSummaryGenerating = (isGenerating: boolean) => {
    isSummaryGenerating.value = isGenerating
  }
  return {
    isSummaryGenerating: readonly(isSummaryGenerating),
    updateSummaryGenerating,
  }
})
