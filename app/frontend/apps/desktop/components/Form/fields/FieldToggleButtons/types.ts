// Copyright (C) 2024-2026 Dejoiy

import type { FormFieldContext } from '#shared/components/Form/types/field.ts'

import type { FormKitOptionsItem } from '@formkit/inputs'

export interface ToggleButtonsOption extends FormKitOptionsItem<string> {
  icon?: string
}

export type FieldToggleButtonsContext = {
  options: ToggleButtonsOption
}

export interface FieldToggleButtonsProps {
  context: FormFieldContext<FieldToggleButtonsContext>
}
