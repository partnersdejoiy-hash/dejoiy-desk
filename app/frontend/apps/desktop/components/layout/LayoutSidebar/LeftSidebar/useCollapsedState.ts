// Copyright (C) 2024-2026 Dejoiy

import { type ComputedRef, inject, type InjectionKey } from 'vue'

export const COLLAPSED_STATE_KEY = Symbol('collapsed-state-key') as InjectionKey<
  ComputedRef<boolean>
>

export const useCollapsedState = () => {
  const collapsedState = inject(COLLAPSED_STATE_KEY)

  return {
    collapsedState,
  }
}
