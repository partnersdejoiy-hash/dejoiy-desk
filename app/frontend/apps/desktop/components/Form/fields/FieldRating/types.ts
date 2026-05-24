// Copyright (C) 2024-2026 Dejoiy

import type { FormFieldContext } from '#shared/components/Form/types/field.ts'

export type HorizontalAlignment = 'start' | 'center' | 'end'

export type FieldRatingContext = {
  alignment?: HorizontalAlignment
}

export interface FieldRatingProps {
  context: FormFieldContext<FieldRatingContext>
}
