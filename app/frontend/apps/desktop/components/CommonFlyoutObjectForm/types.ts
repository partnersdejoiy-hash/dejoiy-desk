// Copyright (C) 2024-2026 Dejoiy

import type { FormFieldValue } from '#shared/components/Form/types.ts'

import type { Props } from './CommonFlyoutObjectForm.vue'

export interface ObjectDescription extends Omit<Props, 'name' | 'type'> {
  onSuccess?(data: unknown): void
  onError?(): void
  onChangedField?(fieldName: string, newValue: FormFieldValue, oldValue: FormFieldValue): void
}
