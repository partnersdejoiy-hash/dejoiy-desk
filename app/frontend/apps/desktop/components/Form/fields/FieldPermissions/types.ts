// Copyright (C) 2024-2026 Dejoiy

import type { FormFieldContext } from '#shared/components/Form/types/field.ts'

export type PermissionsChildOption = {
  value: string
  label: string
  labelPlaceholder?: string[]
  description?: string
}

export type PermissionsParentOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  children?: PermissionsChildOption[]
}

export type PermissionsProps = FormFieldContext<{
  options: PermissionsParentOption[]
}>
