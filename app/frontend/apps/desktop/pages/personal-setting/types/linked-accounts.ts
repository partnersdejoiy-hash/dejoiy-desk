// Copyright (C) 2024-2026 Dejoiy

import type { EnumAuthenticationProvider } from '#shared/graphql/types.ts'

export interface LinkedAccountTableItem {
  id: number
  application: string
  username: string
  uid: string
  name: EnumAuthenticationProvider
  url: string
  enabled: boolean
  authorizationId: string
}
