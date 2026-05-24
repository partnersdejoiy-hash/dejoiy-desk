// Copyright (C) 2024-2026 Dejoiy

import type { TwoFactorPlugin } from '#shared/entities/two-factor/types.ts'
import type { ObjectLike } from '#shared/types/utils.ts'

export interface TwoFactorConfigurationMethod
  extends
    Pick<TwoFactorPlugin, 'name' | 'label' | 'description' | 'icon' | 'configurationOptions'>,
    ObjectLike {
  configured: boolean
  default: boolean
}
