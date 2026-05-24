// Copyright (C) 2024-2026 Dejoiy

import type { FormValues } from '#shared/components/Form/types.ts'

export interface ChangePasswordFormData extends FormValues {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}
