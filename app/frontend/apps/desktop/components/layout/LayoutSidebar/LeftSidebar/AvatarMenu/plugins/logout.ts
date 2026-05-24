// Copyright (C) 2024-2026 Dejoiy

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'sign-out',
  label: __('Sign out'),
  link: '/logout',
  icon: 'box-arrow-in-right',
  separatorTop: true,
  order: 600,
}
