// Copyright (C) 2024-2026 Dejoiy

import type { FormSubmitData } from '#shared/components/Form/types.ts'
import { EnumTicketExternalReferencesIssueTrackerType } from '#shared/graphql/types.ts'

export type SubmitData = FormSubmitData<Record<'link', string>>

export interface ExternalReferencesFormValues {
  externalReferences?: {
    [EnumTicketExternalReferencesIssueTrackerType.Github]?: string[]
    [EnumTicketExternalReferencesIssueTrackerType.Gitlab]?: string[]
    idoit?: number[] // :TODO check for key type
  }
}
