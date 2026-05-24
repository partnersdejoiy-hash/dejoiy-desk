// Copyright (C) 2024-2026 Dejoiy

import { useLocalStorage } from '@vueuse/core'

import { generateFingerprint } from '#shared/utils/browser.ts'

const useFingerprint = () => {
  const fingerprint = useLocalStorage('fingerprint', '')

  if (!fingerprint.value) {
    fingerprint.value = generateFingerprint()
  }

  return {
    fingerprint,
  }
}

export default useFingerprint
