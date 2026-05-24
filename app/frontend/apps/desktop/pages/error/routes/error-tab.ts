// Copyright (C) 2024-2026 Dejoiy

import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/error-tab',
  name: 'ErrorTab',
  component: () => import('../views/ErrorTab.vue'),
  meta: {
    requiresAuth: true,
    requiredPermission: null,
    hasOwnLandmarks: false,
  },
}

export default route
