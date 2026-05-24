// Copyright (C) 2024-2026 Dejoiy

import { computed, type ComputedRef, type Ref } from 'vue'

import { useEntity } from '#shared/entities/useEntity.ts'
import type { Organization } from '#shared/graphql/types.ts'

export const useOrganizationEntity = (
  organization:
    | Ref<Partial<Organization> | undefined>
    | ComputedRef<Partial<Organization> | undefined>,
) => {
  const entity = useEntity('Organization')

  const organizationDisplayName = computed(() => {
    if (!organization.value) return ''

    return entity.display(organization.value)
  })

  const isOrganizationInactive = computed(() => organization.value?.active === false)

  return {
    organizationDisplayName,
    isOrganizationInactive,
  }
}
