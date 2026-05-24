// Copyright (C) 2024-2026 Dejoiy

import type { Props as ActionFooterProps } from '../CommonDialog/CommonDialogActionFooter.vue'

export interface ConfirmationVariantOptions {
  headerTitle: string
  headerIcon?: string
  content: string
  footerActionOptions: Pick<
    ActionFooterProps,
    'actionLabel' | 'actionButton' | 'cancelLabel' | 'hideCancelButton'
  >
}
