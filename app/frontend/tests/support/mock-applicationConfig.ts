// Copyright (C) 2024-2026 Dejoiy

import { useApplicationStore } from '#shared/stores/application.ts'
import type { ConfigList } from '#shared/types/store.ts'

import { initializePiniaStore } from './components/renderComponent.ts'

export const mockApplicationConfig = (config: Partial<ConfigList>) => {
  initializePiniaStore()

  const application = useApplicationStore()

  application.config = {
    ...application.config,
    ...config,
  } as ConfigList
}
