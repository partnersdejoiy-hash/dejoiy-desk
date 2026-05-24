// Copyright (C) 2024-2026 Dejoiy

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/notifications',
    name: 'NotificationsList',
    component: () => import('./views/NotificationsList.vue'),
    meta: {
      title: __('Notifications'),
      requiresAuth: true,
      requiredPermission: null,
      hasHeader: true,
      hasBottomNavigation: true,
      level: 1,
    },
  },
]

export default routes
