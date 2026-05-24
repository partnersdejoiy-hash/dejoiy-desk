// Copyright (C) 2024-2026 Dejoiy

import { inject } from 'vue'

import type { TicketInformation } from '#mobile/entities/ticket/types.ts'

export const TICKET_INFORMATION_SYMBOL = Symbol('ticket')

export const useTicketInformation = () => {
  return inject(TICKET_INFORMATION_SYMBOL) as TicketInformation
}
