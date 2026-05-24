// Copyright (C) 2024-2026 Dejoiy

import { computed } from 'vue'

import { useApplicationStore } from '#shared/stores/application.ts'

export const useCheckTokenAccess = () => {
  const { config } = useApplicationStore()

  const canUseAccessToken = computed(() => !!config.api_token_access)

  return {
    canUseAccessToken,
  }
}
