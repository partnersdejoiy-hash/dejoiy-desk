// Copyright (C) 2024-2026 Dejoiy

import { useLocalStorage } from '@vueuse/core'

export const useForceDesktop = () => {
  const forceDesktopLocalStorage = useLocalStorage<boolean>('forceDesktopApp', false, {
    writeDefaults: false,
  })

  const forceDesktop = () => {
    forceDesktopLocalStorage.value = true
  }

  return {
    forceDesktopLocalStorage,
    forceDesktop,
  }
}
