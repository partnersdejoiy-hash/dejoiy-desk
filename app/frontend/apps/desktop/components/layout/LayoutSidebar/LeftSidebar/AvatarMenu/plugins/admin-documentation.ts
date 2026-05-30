// Copyright (C) 2024-2026 Dejoiy

import { DEJOIY_BRAND } from '#shared/constants/branding.ts'

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'admin-documentation',
  label: __('Help Center'),
  permission: 'admin.*',
  link: DEJOIY_BRAND.adminHelpUrl,
  linkExternal: false,
  openInNewTab: false,
  icon: 'book',
  order: 60,
}
