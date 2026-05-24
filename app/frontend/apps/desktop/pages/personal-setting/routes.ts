// Copyright (C) 2024-2026 Dejoiy

import { usePersonalSettingStore } from './stores/personalSetting.ts'
import { personalSettingRoutes } from './views/PersonalSetting/plugins/index.ts'

import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    path: '/personal-setting',
    name: 'PersonalSettings',
    component: () => import('./views/PersonalSetting.vue'),
    meta: {
      title: __('Profile'),
      icon: 'user-settings',
      requiresAuth: true,
      requiredPermission: ['*'],
      level: 2,
      pageKey: 'personal-setting',
      permanentItem: true,
    },
    children: personalSettingRoutes,
    redirect: () => ({
      path: usePersonalSettingStore().previousPersonalSettingPath,
    }),
  },
]

export default route
