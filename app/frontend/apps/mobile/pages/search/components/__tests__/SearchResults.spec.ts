// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'
import { mockPermissions } from '#tests/support/mock-permissions.ts'

import type { OrganizationItemData } from '#mobile/components/Organization/types.ts'

import SearchResults from '../SearchResults.vue'

describe('renders search result', () => {
  it('renders organization', async () => {
    const org: OrganizationItemData = {
      name: 'organization',
      id: '123',
      internalId: 123,
      ticketsCount: {
        open: 2,
        closed: 0,
      },
      active: true,
    }

    mockPermissions(['ticket.agent'])

    const view = renderComponent(SearchResults, {
      props: {
        data: [org],
        type: 'organization',
      },
      store: true,
      router: true,
    })

    // checking name is enough, because the component is tested elsewhere
    const organization = view.getByText('organization')

    expect(organization).toBeInTheDocument()

    expect(view.getLinkFromElement(organization)).toHaveAttribute('href', '/organizations/123')
  })
})
