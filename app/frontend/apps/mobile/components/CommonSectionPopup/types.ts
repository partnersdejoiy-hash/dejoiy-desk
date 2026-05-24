// Copyright (C) 2024-2026 Dejoiy

import type { TooltipItemDescriptor } from '#shared/components/CommonTooltip/types.ts'
import type { ButtonVariant } from '#shared/components/Form/fields/FieldButton/types.ts'

export interface PopupItemDescriptor extends TooltipItemDescriptor {
  link?: string
  class?: string
  buttonVariant?: ButtonVariant
  attributes?: Record<string, unknown>
  onAction?(): void
  noHideOnSelect?: boolean
  buttonPrefixIcon?: string
  buttonAlign?: 'start' | 'end'
}
