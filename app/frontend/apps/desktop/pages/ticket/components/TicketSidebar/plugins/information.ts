// Copyright (C) 2024-2026 Dejoiy

import { TicketSidebarScreenType } from '#desktop/pages/ticket/types/sidebar.ts'

import TicketSidebarInformation from '../TicketSidebarInformation/TicketSidebarInformation.vue'

import type { TicketSidebarPlugin } from './types.ts'

export default <TicketSidebarPlugin>{
  title: __('Ticket'),
  component: TicketSidebarInformation,
  permissions: ['ticket.agent', 'ticket.customer'],
  screens: [TicketSidebarScreenType.TicketDetailView],
  views: ['agent', 'customer'],
  icon: 'chat-left-text',
  order: 100,
}
