// Copyright (C) 2024-2026 Dejoiy

import { readonly, ref } from 'vue'

const isCustomLayout = ref(false)

export const useCustomLayout = () => {
  const setCustomLayout = (value: boolean) => {
    isCustomLayout.value = value
  }

  return {
    isCustomLayout: readonly(isCustomLayout),
    setCustomLayout,
  }
}
