// Copyright (C) 2024-2026 Dejoiy

import { EntityType } from '#desktop/components/CommonSimpleEntityList/types.ts'

export default {
  type: EntityType.User,
  component: () => import('#desktop/components/CommonSimpleEntityList/entity/UserEntity.vue'),
  emptyMessage: __('No members found'),
}
