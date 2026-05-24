// Copyright (C) 2024-2026 Dejoiy

import { computed, ref } from 'vue'

import type { CommonPopoverInternalInstance } from './types.ts'
import type { ComputedRef } from 'vue'

const instances = ref(new Set<CommonPopoverInternalInstance>()) as unknown as ComputedRef<
  Set<CommonPopoverInternalInstance>
>

export const usePopoverInstances = () => {
  const isOpened = computed(() => {
    for (const instance of instances.value) {
      if (instance.isOpen.value) {
        return true
      }
    }
    return false
  })

  return {
    isOpened,
    instances,
  }
}
