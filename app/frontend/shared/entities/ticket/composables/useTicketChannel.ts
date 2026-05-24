// Copyright (C) 2024-2026 Dejoiy

import { computed, type Ref } from 'vue'

import { type TicketById } from '#shared/entities/ticket/types.ts'

import { getTicketChannelPlugin } from '../channel/plugins/index.ts'

export const useTicketChannel = (ticket: Ref<TicketById | undefined>) => {
  const channelPlugin = computed(() => getTicketChannelPlugin(ticket.value?.initialChannel))

  const channelAlert = computed(() => {
    if (!ticket.value) return null

    return channelPlugin.value?.channelAlert(ticket.value)
  })

  const hasChannelAlert = computed(
    () => Boolean(channelAlert.value) && Boolean(channelAlert.value?.text),
  )

  return { channelPlugin, channelAlert, hasChannelAlert }
}
