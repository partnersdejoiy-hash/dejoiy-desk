// Copyright (C) 2024-2026 Dejoiy

import { useApplicationStore } from '#shared/stores/application.ts'

import TicketSidebarGitLab from '#desktop/pages/ticket/components/TicketSidebar/TicketSidebarExternalReferences/TicketSidebarExternalIssueTracker/TicketSidebarGitLab/TicketSidebarGitLab.vue'
import { TicketSidebarScreenType } from '#desktop/pages/ticket/types/sidebar.ts'

import type { TicketSidebarPlugin } from './types.ts'

export default <TicketSidebarPlugin>{
  title: __('GitLab'),
  component: TicketSidebarGitLab,
  permissions: ['ticket.agent'],
  screens: [TicketSidebarScreenType.TicketDetailView, TicketSidebarScreenType.TicketCreate],
  views: ['agent'],
  icon: 'gitlab',
  order: 5000,
  available: () => useApplicationStore().config.gitlab_integration,
}
