// Copyright (C) 2024-2026 Dejoiy

import { computed, type Ref } from 'vue'

import type { TicketById } from '#shared/entities/ticket/types.ts'

import { getTicketView } from '../utils/getTicketView.ts'

export const useTicketView = (ticket: Ref<TicketById | undefined>) => {
  const view = computed(() => ticket.value && getTicketView(ticket.value))

  const isTicketEditable = computed(() => !!view.value?.isTicketEditable)
  const isTicketCustomer = computed(() => !!view.value?.isTicketCustomer)
  const isTicketAgent = computed(() => !!view.value?.isTicketAgent)

  return { isTicketAgent, isTicketCustomer, isTicketEditable }
}
