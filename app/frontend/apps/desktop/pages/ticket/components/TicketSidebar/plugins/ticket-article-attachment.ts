// Copyright (C) 2024-2026 Dejoiy

import { useApplicationStore } from '#shared/stores/application.ts'

import { TicketSidebarScreenType } from '#desktop/pages/ticket/types/sidebar.ts'

import TicketSidebarAttachment from '../TicketSidebarAttachment/TicketSidebarAttachment.vue'

import type { TicketSidebarPlugin } from './types.ts'

export default <TicketSidebarPlugin>{
  title: __('Attachments'),
  component: TicketSidebarAttachment,
  permissions: ['ticket.agent', 'ticket.customer'],
  screens: [TicketSidebarScreenType.TicketDetailView],
  views: ['agent', 'customer'],
  icon: 'paperclip',
  order: 7000,
  available: () => {
    const { config } = useApplicationStore()

    return config.ui_ticket_zoom_sidebar_article_attachments
  },
}
