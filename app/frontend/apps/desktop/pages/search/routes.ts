// Copyright (C) 2024-2026 Dejoiy

import { EnumTaskbarEntity } from '#shared/graphql/types.ts'

import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    path: '/search/:searchTerm?',
    name: 'Search',
    props: true,
    component: () => import('./views/Search.vue'),
    meta: {
      title: __('Search'),
      requiresAuth: true,
      pageKey: 'search',
      requiredPermission: [],
      taskbarTabEntity: EnumTaskbarEntity.Search,
      isTaskbarTabPossible: (route) => !!route.query.entity,
      level: 2,
    },
  },
]

export default route
