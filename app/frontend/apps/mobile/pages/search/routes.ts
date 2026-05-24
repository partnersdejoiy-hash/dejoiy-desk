// Copyright (C) 2024-2026 Dejoiy

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/search/:type?',
    name: 'SearchOverview',
    props: true,
    component: () => import('./views/SearchOverview.vue'),
    beforeEnter(to) {
      const redirectedHash = to.redirectedFrom?.hash
      // if redirected from hash-based route, get search from the hash
      // or if already redirected form itself, do nothing
      if (!redirectedHash || to.query.search || to.params.type) return
      const search = redirectedHash.slice('#search/'.length)
      return {
        name: 'SearchOverview',
        // probably a ticket, but can be anything
        params: { type: 'ticket' },
        query: { search },
      }
    },
    meta: {
      title: __('Search'),
      requiresAuth: true,
      requiredPermission: ['ticket.agent', 'ticket.customer'],
      hasBottomNavigation: true,
      level: 3,
    },
  },
]

export default routes
