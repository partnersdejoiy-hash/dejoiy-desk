// Copyright (C) 2024-2026 Dejoiy

import AvatarMenuAppearanceItem from '../AvatarMenuAppearanceItem.vue'

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'appearance',
  label: __('Appearance'),
  icon: 'brightness-alt-high',
  noCloseOnClick: true,
  order: 100,
  component: AvatarMenuAppearanceItem,
  permission: 'user_preferences.appearance',
}
