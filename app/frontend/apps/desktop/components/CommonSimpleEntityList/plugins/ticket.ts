// Copyright (C) 2024-2026 Dejoiy

import { EntityType } from '#desktop/components/CommonSimpleEntityList/types.ts'

export default {
  type: EntityType.Ticket,
  component: () => import('#desktop/components/CommonSimpleEntityList/entity/TicketEntity.vue'),
  emptyMessage: __('No results found'),
}
