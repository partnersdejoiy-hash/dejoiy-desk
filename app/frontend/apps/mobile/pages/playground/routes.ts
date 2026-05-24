// Copyright (C) 2024-2026 Dejoiy

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/playground',
    name: 'PlaygroundOverview',
    props: true,
    component: () => import('./views/PlaygroundOverview.vue'),
    meta: {
      title: 'Playground',
      requiresAuth: true,
      requiredPermission: ['*'],
      hasBottomNavigation: true,
      level: 2,
    },
  },
]

export default routes
