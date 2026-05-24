// Copyright (C) 2024-2026 Dejoiy

import { useSystemSetupInfoStore } from '#desktop/pages/guided-setup/stores/systemSetupInfo.ts'

export const systemSetupBeforeRouteEnterGuard = () => {
  const { systemSetupDone } = useSystemSetupInfoStore()

  if (systemSetupDone) {
    return '/'
  }

  return true
}
