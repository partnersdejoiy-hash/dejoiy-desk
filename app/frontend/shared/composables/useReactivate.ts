// Copyright (C) 2024-2026 Dejoiy

import { onActivated, onDeactivated } from 'vue'

/**
 * Skips to run after mounting phase
 * Runs only after component is reactivated from cache
/ */
export const useReactivate = (
  onActivatedCallback: () => void,
  onDeactivatedCallback?: () => void,
) => {
  let isMounted = false

  onActivated(() => {
    if (!isMounted) return
    onActivatedCallback()
  })

  onDeactivated(() => {
    isMounted = true
    onDeactivatedCallback?.()
  })
}
