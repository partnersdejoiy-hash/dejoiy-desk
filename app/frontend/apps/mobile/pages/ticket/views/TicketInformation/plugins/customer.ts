// Copyright (C) 2024-2026 Dejoiy

import type { TicketInformationPlugin } from './index.ts'

export default <TicketInformationPlugin>{
  label: __('Customer'),
  route: {
    path: 'customer',
    name: 'TicketInformationCustomer',
    props: (route) => ({ internalId: Number(route.params.internalId) }),
    component: () => import('../TicketInformationCustomer.vue'),
    meta: {
      requiresAuth: true,
      requiredPermission: ['ticket.agent'],
    },
  },
  order: 200,
}
