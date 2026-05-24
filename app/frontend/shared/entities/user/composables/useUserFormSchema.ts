// Copyright (C) 2024-2026 Dejoiy

import type { FormSchemaNode } from '#shared/components/Form/types.ts'
import { EnumObjectManagerObjects } from '#shared/graphql/types.ts'

export const useUserFormSchema = () => {
  const buildUserSchema = (screen: 'edit' | 'create', schema?: FormSchemaNode[]) => [
    {
      screen,
      object: EnumObjectManagerObjects.User,
    },
    ...(schema ? schema : []),
  ]

  return {
    buildUserSchema,
  }
}
