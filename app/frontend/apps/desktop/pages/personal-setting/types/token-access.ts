// Copyright (C) 2024-2026 Dejoiy

import type { FormValues } from '#shared/components/Form/types.ts'

export interface NewTokenAccessFormData extends FormValues {
  name: string
  expires_at?: string
  permissions: string[]
}
