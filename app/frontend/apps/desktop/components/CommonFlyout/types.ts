// Copyright (C) 2024-2026 Dejoiy

import { type Props as ButtonProps } from '#desktop/components/CommonButton/CommonButton.vue'

export type FlyoutSizes = 'medium' | 'large'

export interface ActionFooterOptions {
  hideActionButton?: boolean
  actionLabel?: string
  actionButton?: Pick<ButtonProps, 'prefixIcon' | 'variant' | 'type' | 'disabled'>
  hideCancelButton?: boolean
  cancelLabel?: string
  cancelButton?: Pick<ButtonProps, 'prefixIcon' | 'variant' | 'disabled'>
}

export interface ActionFooterProps extends ActionFooterOptions {
  formNodeId?: string
  isFormDisabled?: boolean
}
