// Copyright (C) 2024-2026 Dejoiy

import type { TicketInformationPlugin } from './index.ts'

export default <TicketInformationPlugin>{
  label: __('Ticket'),
  route: {
    path: '',
    name: 'TicketInformationDetails',
    component: () => import('../TicketInformationDetails.vue'),
    meta: {
      requiresAuth: true,
      requiredPermission: [],
    },
  },
  order: 100,
}
