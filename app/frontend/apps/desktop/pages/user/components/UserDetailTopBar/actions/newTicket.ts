// Copyright (C) 2024-2026 Dejoiy

import type { User } from '#shared/graphql/types.ts'

import type { DetailViewActionPlugin } from '#desktop/types/actions.ts'

import type { Router } from 'vue-router'

export default <DetailViewActionPlugin>{
  key: 'new-ticket',
  label: __('New ticket'),
  icon: 'plus-square-fill',
  variant: 'secondary',
  showLabel: true,
  permission: 'ticket.agent',
  order: 200,
  topLevel: true,
  onClick: (user?: User, router?: Router) => {
    if (!user) return

    router?.push({
      name: 'TicketCreate',
      query: { customer_id: user.internalId },
    })
  },
}
