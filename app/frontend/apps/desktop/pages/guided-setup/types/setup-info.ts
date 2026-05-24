// Copyright (C) 2024-2026 Dejoiy

import type { EnumSystemSetupInfoStatus, EnumSystemSetupInfoType } from '#shared/graphql/types.ts'

export interface SystemSetupInfoStorage {
  type?: EnumSystemSetupInfoType | null
  status?: EnumSystemSetupInfoStatus
  lockValue?: string
  importSource?: string
}
