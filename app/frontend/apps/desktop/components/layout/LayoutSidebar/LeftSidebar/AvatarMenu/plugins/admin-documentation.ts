// Copyright (C) 2024-2026 Dejoiy

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'admin-documentation',
  label: __('Admin documentation'),
  permission: 'admin.*',
  link: 'https://next.zammad.org/en/documentation/manage-zammad/start.html', // TODO: change link when new admin documentation is released
  linkExternal: true,
  openInNewTab: true,
  icon: 'book',
  order: 60,
}
