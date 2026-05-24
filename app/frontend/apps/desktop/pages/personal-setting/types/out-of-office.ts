// Copyright (C) 2024-2026 Dejoiy

import type { FormValues } from '#shared/components/Form/types.ts'

export interface OutOfOfficeFormData extends FormValues {
  text?: string
  date_range?: string[]
  replacement_id?: number
  enabled: boolean
}
