// Copyright (C) 2024-2026 Dejoiy

import { TicketSidebarScreenType } from '#desktop/pages/ticket/types/sidebar.ts'

import TicketSidebarSharedDraftStart from '../TicketSidebarSharedDraftStart/TicketSidebarSharedDraftStart.vue'

import type { TicketSidebarPlugin } from './types.ts'

export default <TicketSidebarPlugin>{
  title: __('Shared drafts'),
  component: TicketSidebarSharedDraftStart,
  permissions: ['ticket.agent'],
  screens: [TicketSidebarScreenType.TicketCreate],
  views: ['agent'],
  icon: 'file-text',
  order: 3000,
  available: (context) => !!context.formValues.group_id,
}
