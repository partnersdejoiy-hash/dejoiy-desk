// Copyright (C) 2024-2026 Dejoiy

import type { AutocompleteSearchTicketQuery } from '#shared/graphql/types.ts'
import type { ConfidentTake } from '#shared/types/utils.ts'

export type AutoCompleteTicketOption = ConfidentTake<
  AutocompleteSearchTicketQuery,
  'autocompleteSearchTicket'
>[number]
