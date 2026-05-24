// Copyright (C) 2024-2026 Dejoiy

import type { FormSchemaNode } from '#shared/components/Form/types.ts'
import { EnumObjectManagerObjects } from '#shared/graphql/types.ts'

export const useOrganizationFormSchema = () => {
  const buildOrganizationSchema = (screen: 'edit' | 'create', schema?: FormSchemaNode[]) => [
    {
      screen,
      object: EnumObjectManagerObjects.Organization,
    },
    ...(schema ? schema : []),
  ]

  return {
    buildOrganizationSchema,
  }
}
