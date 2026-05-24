// Copyright (C) 2024-2026 Dejoiy
import type { AutoCompleteOrganizationOption } from '#shared/components/Form/fields/FieldOrganization/types.ts'
import type { Organization } from '#shared/graphql/types.ts'

export const useFieldOrganizationOption = (
  organization: Organization,
): AutoCompleteOrganizationOption => ({
  value: organization.internalId,
  label: organization.name as string,
  organization,
})
