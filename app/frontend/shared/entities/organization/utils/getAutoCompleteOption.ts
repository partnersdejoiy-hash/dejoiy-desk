// Copyright (C) 2024-2026 Dejoiy

import type { Organization } from '#shared/graphql/types.ts'
import { getIdFromGraphQLId } from '#shared/graphql/utils.ts'

export const getAutoCompleteOption = (organization: Partial<Organization>) => {
  return {
    label: organization.name,
    value: organization.internalId || getIdFromGraphQLId(organization.id as string),
    organization,
  }
}
