// Copyright (C) 2024-2026 Dejoiy

import { computed, type Ref } from 'vue'

import { type TicketById } from '#shared/entities/ticket/types.ts'

import type { JsonValue } from 'type-fest'

export const useTicketPreferences = (ticket: Ref<TicketById | undefined>) => {
  const ticketPreferences = computed<Record<string, JsonValue>>(() => ticket.value?.preferences)

  return { ticketPreferences }
}
