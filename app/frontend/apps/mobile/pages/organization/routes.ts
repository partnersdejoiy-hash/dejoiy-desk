// Copyright (C) 2024-2026 Dejoiy

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/organizations/:internalId(\\d+)',
    name: 'OrganizationDetailView',
    props: (route) => ({ internalId: Number(route.params.internalId) }),
    component: () => import('./views/OrganizationDetailView.vue'),
    alias: '/organization/profile/:internalId(\\d+)',
    meta: {
      title: __('Organization'),
      requiresAuth: true,
      requiredPermission: ['ticket.agent'],
      hasBottomNavigation: true,
      hasHeader: true,
      level: 1,
    },
  },
]

export default routes
