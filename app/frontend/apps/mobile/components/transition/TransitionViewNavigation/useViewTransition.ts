// Copyright (C) 2024-2026 Dejoiy

import { ref } from 'vue'

import { ViewTransitions } from './types.ts'

const viewTransition = ref<ViewTransitions>(ViewTransitions.Replace)

export const useViewTransition = () => {
  const setViewTransition = (newViewTransition: ViewTransitions) => {
    viewTransition.value = newViewTransition
  }

  return {
    setViewTransition,
    viewTransition,
  }
}
