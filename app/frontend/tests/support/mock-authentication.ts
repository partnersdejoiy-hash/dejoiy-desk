// Copyright (C) 2024-2026 Dejoiy

import { useAuthenticationStore } from '#shared/stores/authentication.ts'

import { initializePiniaStore } from './components/renderComponent.ts'

export const mockAuthentication = (authenticated: boolean) => {
  initializePiniaStore()

  const authentication = useAuthenticationStore()
  authentication.authenticated = authenticated
}
