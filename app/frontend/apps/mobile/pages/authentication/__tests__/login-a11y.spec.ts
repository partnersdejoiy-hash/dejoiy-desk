// Copyright (C) 2024-2026 Dejoiy

import { visitView } from '#tests/support/components/visitView.ts'
import { mockApplicationConfig } from '#tests/support/mock-applicationConfig.ts'

import {
  mockPublicLinks,
  mockPublicLinksSubscription,
} from '#shared/entities/public-links/__tests__/mocks/mockPublicLinks.ts'

describe('testing login a11y', () => {
  beforeEach(() => {
    mockApplicationConfig({
      product_name: 'Zammad Test System',
    })
    mockPublicLinks([])
    mockPublicLinksSubscription()
  })

  it('has no accessibility violations', async () => {
    const view = await visitView('/login')
    await expect(view.container).toBeAccessible()
  })
})
