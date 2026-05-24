// Copyright (C) 2024-2026 Dejoiy

import type { AutocompleteSearchAgentQuery } from '#shared/graphql/types.ts'
import type { ConfidentTake } from '#shared/types/utils.ts'

export type AutoCompleteAgentOption = ConfidentTake<
  AutocompleteSearchAgentQuery,
  'autocompleteSearchAgent'
>[number]
