// Copyright (C) 2024-2026 Dejoiy

import type { TicketView } from '#shared/entities/ticket/types.ts'

import type {
  TicketSidebarContext,
  TicketSidebarScreenType,
} from '#desktop/pages/ticket/types/sidebar.ts'

import type { Component } from 'vue'

export interface TicketSidebarPlugin {
  title: string
  order: number
  component: Component
  permissions: string[]
  screens: TicketSidebarScreenType[]
  views: TicketView[]
  icon: string
  available?: (context: TicketSidebarContext) => boolean
}
