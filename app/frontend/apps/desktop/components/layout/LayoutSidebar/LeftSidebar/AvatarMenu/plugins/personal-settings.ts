// Copyright (C) 2024-2026 Dejoiy

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'personal-setting',
  label: __('Profile settings'),
  link: '/personal-setting',
  icon: 'user-settings',
  order: 400,
  permission: 'user_preferences.*',
}
