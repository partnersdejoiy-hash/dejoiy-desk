// Copyright (C) 2024-2026 Dejoiy

import { storeToRefs } from 'pinia'

import { useTicketOverviewsStore } from '#desktop/entities/ticket/stores/ticketOverviews.ts'

export const useTicketOverviews = () => {
  const store = useTicketOverviewsStore()
  const { setCurrentTicketOverviewLink, updateLastUsedOverview } = store

  const state = storeToRefs(store)

  return {
    setCurrentTicketOverviewLink,
    updateLastUsedOverview,
    ...state,
  }
}
