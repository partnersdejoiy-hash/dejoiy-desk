// Copyright (C) 2024-2026 Dejoiy

import type { Organization } from '#shared/graphql/types.ts'

import {
  openOrganizationHistoryFlyout,
  useOrganizationHistory,
} from '#desktop/entities/organization/composables/useOrganizationHistory.ts'
import type { DetailViewActionPlugin } from '#desktop/types/actions.ts'

export default <DetailViewActionPlugin>{
  key: 'history-organization',
  label: __('History'),
  icon: 'clock-history',
  order: 200,
  permission: ['ticket.agent', 'admin.organization'],
  initialize: useOrganizationHistory,
  onClick: (organization: Organization) => openOrganizationHistoryFlyout(organization.id),
}
