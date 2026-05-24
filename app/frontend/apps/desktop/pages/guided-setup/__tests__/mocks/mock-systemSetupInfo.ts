// Copyright (C) 2024-2026 Dejoiy

import { initializePiniaStore } from '#tests/support/components/renderComponent.ts'

import { useSystemSetupInfoStore } from '../../stores/systemSetupInfo.ts'

import type { SystemSetupInfoStorage } from '../../types/setup-info.ts'

export const mockSystemSetupInfo = (systemSetupInfo: SystemSetupInfoStorage) => {
  initializePiniaStore()

  const systemSetupInfoStore = useSystemSetupInfoStore()
  systemSetupInfoStore.systemSetupInfo = systemSetupInfo
}
