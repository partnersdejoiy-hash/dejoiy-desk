// Copyright (C) 2024-2026 Dejoiy

import { type Props as IconProps } from '#shared/components/CommonIcon/CommonIcon.vue'

export interface CommonButtonOption {
  link?: string
  value?: string | number
  onAction?(): unknown | Promise<unknown>
  label: string
  controls?: string
  selected?: boolean
  labelPlaceholder?: string[]
  disabled?: boolean
  hidden?: boolean
  permissions?: string | string[]
  icon?: string | IconProps
  class?: string
}
