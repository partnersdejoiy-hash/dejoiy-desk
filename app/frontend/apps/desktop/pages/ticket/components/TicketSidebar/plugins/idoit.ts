// Copyright (C) 2024-2026 Dejoiy

import { useApplicationStore } from '#shared/stores/application.ts'

import TicketSidebarIdoit from '#desktop/pages/ticket/components/TicketSidebar/TicketSidebarExternalReferences/TicketSidebarIdoit/TicketSidebarIdoit.vue'
import { TicketSidebarScreenType } from '#desktop/pages/ticket/types/sidebar.ts'

import type { TicketSidebarPlugin } from './types.ts'

export default <TicketSidebarPlugin>{
  title: __('i-doit'),
  component: TicketSidebarIdoit,
  permissions: ['ticket.agent'],
  screens: [TicketSidebarScreenType.TicketDetailView, TicketSidebarScreenType.TicketCreate],
  views: ['agent'],
  icon: 'i-doit-logo', // icon does not exist underlying cmp will use it as a base to get light and dark icon name
  order: 6000,
  available: () => useApplicationStore().config.idoit_integration,
}
