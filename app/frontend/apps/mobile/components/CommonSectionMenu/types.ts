// Copyright (C) 2024-2026 Dejoiy

import type { RequiredPermission } from '#shared/types/permission.ts'

import { type Props as LinkProps } from './CommonSectionMenuLink.vue'

export interface MenuItem extends LinkProps {
  type: 'link'
  permission?: RequiredPermission
  onClick?(event: MouseEvent): void
}
