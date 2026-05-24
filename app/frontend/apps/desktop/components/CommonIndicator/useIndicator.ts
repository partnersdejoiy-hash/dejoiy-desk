// Copyright (C) 2024-2026 Dejoiy

import { shallowRef } from 'vue'

export const useIndicator = () => {
  const isIntersecting = shallowRef(false)

  return { isIntersecting }
}
