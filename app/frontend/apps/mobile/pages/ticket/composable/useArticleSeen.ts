// Copyright (C) 2024-2026 Dejoiy

import { useIntersectionObserver } from '@vueuse/core'

import type { Ref } from 'vue'

export const useArticleSeen = (
  element: Ref<HTMLElement | undefined>,
  // oxlint-disable-next-line no-explicit-any
  emit: (...args: any[]) => void,
) => {
  const observer = useIntersectionObserver(
    element,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        emit('seen')
        observer.stop()
      }
    },
    { threshold: 0.4 },
  )
}
