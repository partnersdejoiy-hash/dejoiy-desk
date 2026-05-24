// Copyright (C) 2024-2026 Dejoiy

import type { TicketInformationPlugin } from './index.ts'

export default <TicketInformationPlugin>{
  label: __('Organization'),
  route: {
    path: 'organization',
    name: 'TicketInformationOrganization',
    component: () => import('../TicketInformationOrganization.vue'),
    meta: {
      requiresAuth: true,
      requiredPermission: [],
    },
  },
  order: 300,
  condition: (ticket) => !!ticket?.organization,
}
