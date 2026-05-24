// Copyright (C) 2024-2026 Dejoiy

import type { PersonalSettingPlugin } from './types.ts'

export default <PersonalSettingPlugin>{
  label: __('Devices'),
  category: {
    label: __('Security'),
    id: 'category-security',
    order: 2000,
  },
  route: {
    path: 'devices',
    alias: '/profile/devices',
    name: 'PersonalSettingDevices',
    component: () => import('../../PersonalSettingDevices.vue'),
    level: 2,
    meta: {
      title: __('Devices'),
      requiresAuth: true,
      requiredPermission: 'user_preferences.device',
    },
  },
  order: 3000,
  keywords: __('session,sessions,computer,computers,browser,browsers,access'),
}
