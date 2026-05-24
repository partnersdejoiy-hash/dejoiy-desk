// Copyright (C) 2024-2026 Dejoiy

import type {
  AutocompleteSearchGenericQuery,
  AutocompleteSearchUserQuery,
} from '#shared/graphql/types.ts'
import type { ConfidentTake } from '#shared/types/utils.ts'

export type AutoCompleteCustomerGenericOption = ConfidentTake<
  AutocompleteSearchGenericQuery,
  'autocompleteSearchGeneric'
>[number]

export type AutoCompleteCustomerUserOption = ConfidentTake<
  AutocompleteSearchUserQuery,
  'autocompleteSearchUser'
>[number]
