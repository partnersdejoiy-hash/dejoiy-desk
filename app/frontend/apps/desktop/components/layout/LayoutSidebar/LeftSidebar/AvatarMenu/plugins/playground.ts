// Copyright (C) 2024-2026 Dejoiy

import type { AvatarMenuPlugin } from './index.ts'

const IS_DEV_MODE = import.meta.env.DEV

export default <AvatarMenuPlugin>{
  key: 'playground',
  label: 'Playground', // no no no
  show: () => IS_DEV_MODE,
  link: '/playground',
  icon: 'logo-flat',
  order: 150,
  permission: 'admin',
}
