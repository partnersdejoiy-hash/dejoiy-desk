// Copyright (C) 2024-2026 Dejoiy

import emitter from '#shared/utils/emitter.ts'

export const useQuickSearchInput = () => {
  const resetQuickSearchInputField = () => {
    emitter.emit('reset-quick-search-field')
  }

  return {
    resetQuickSearchInputField,
  }
}
