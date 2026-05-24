// Copyright (C) 2024-2026 Dejoiy

import { EntityType } from '#desktop/components/CommonSimpleEntityList/types.ts'

export default {
  type: EntityType.Organization,
  component: () =>
    import('#desktop/components/CommonSimpleEntityList/entity/OrganizationEntity.vue'),
  emptyMessage: __('No organizations found'),
}
