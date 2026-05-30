// Copyright (C) 2024-2026 Dejoiy

import { DEJOIY_BRAND } from '#shared/constants/branding.ts'

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'user-documentation',
  label: __('Help Center'),
  permission: ['ticket.agent', 'report', 'knowledge_base.*', 'chat.agent', 'cti.agent'],
  link: DEJOIY_BRAND.helpUrl,
  linkExternal: false,
  openInNewTab: false,
  icon: 'book',
  order: 80,
}
