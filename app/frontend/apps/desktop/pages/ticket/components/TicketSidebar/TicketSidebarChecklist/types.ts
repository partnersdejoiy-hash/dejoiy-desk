// Copyright (C) 2024-2026 Dejoiy

import type { InputMaybe } from '#shared/graphql/types.ts'

export type AddNewChecklistInput = {
  ticketId?: InputMaybe<string>
  ticketInternalId?: InputMaybe<number>
  ticketNumber?: InputMaybe<string>
  templateId?: InputMaybe<string>
}
