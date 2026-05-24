// Copyright (C) 2024-2026 Dejoiy

import type { EnumAuthenticationProvider } from '#shared/graphql/types.ts'

export interface ThirdPartyAuthProvider {
  name: EnumAuthenticationProvider
  label: string
  enabled: boolean
  icon: string
  url: string
}
