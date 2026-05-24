// Copyright (C) 2024-2026 Dejoiy

import type { FormSubmitData } from '#shared/components/Form/types.ts'

export type FormFieldRecords = {
  type: string | undefined
  filter: string | undefined
  objectIds: number[]
}

export type FormDataRecords = FormSubmitData<FormFieldRecords>
