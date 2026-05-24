// Copyright (C) 2024-2026 Dejoiy

import type { ButtonVariant } from '#shared/components/Form/fields/FieldButton/types.ts'

export type ButtonType = 'button' | 'reset' | 'submit'
export type ButtonSize = 'small' | 'medium'

export interface CommonButtonProps {
  prefixIcon?: string
  icon?: string
  suffixIcon?: string
  form?: string
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  variant?: ButtonVariant
  transparentBackground?: boolean
  align?: 'start' | 'end'
}
