// Copyright (C) 2024-2026 Dejoiy

import { useSessionStore } from '#shared/stores/session.ts'

import type { TicketById, TicketView } from '../types.ts'

export const getTicketView = (ticket: TicketById) => {
  const session = useSessionStore()

  const isTicketEditable = ticket.policy.update

  const isTicketCustomer =
    session.hasPermission('ticket.customer') && !ticket.policy.agentReadAccess

  const isTicketAgent = ticket.policy.agentReadAccess

  const ticketView: TicketView = isTicketAgent ? 'agent' : 'customer'

  return {
    isTicketAgent,
    isTicketCustomer,
    isTicketEditable,
    ticketView,
  }
}
