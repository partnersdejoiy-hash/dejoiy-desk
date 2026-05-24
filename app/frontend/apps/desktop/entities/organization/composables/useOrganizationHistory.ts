// Copyright (C) 2024-2026 Dejoiy

import { EnumObjectManagerObjects } from '#shared/graphql/types.ts'

import { openFlyout } from '#desktop/components/CommonFlyout/useFlyout.ts'
import { useHistoryFlyout } from '#desktop/components/CommonHistoryFlyout/useHistoryFlyout.ts'

import { useOrganizationHistoryQuery } from '../graphql/queries/history.api.ts'

export const ORGANIZATION_HISTORY_FLYOUT_NAME = 'organization-history-flyout'

export const openOrganizationHistoryFlyout = (organizationId: ID) => {
  openFlyout(ORGANIZATION_HISTORY_FLYOUT_NAME, {
    name: ORGANIZATION_HISTORY_FLYOUT_NAME,
    type: EnumObjectManagerObjects.Organization,
    query: () => useOrganizationHistoryQuery({ organizationId }),
  })
}

export const useOrganizationHistory = () => {
  useHistoryFlyout(ORGANIZATION_HISTORY_FLYOUT_NAME, EnumObjectManagerObjects.Organization)

  return { openOrganizationHistoryFlyout }
}
