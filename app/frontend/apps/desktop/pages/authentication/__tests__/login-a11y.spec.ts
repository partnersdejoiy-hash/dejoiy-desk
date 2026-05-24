// Copyright (C) 2024-2026 Dejoiy

import { visitView } from '#tests/support/components/visitView.ts'
import { mockApplicationConfig } from '#tests/support/mock-applicationConfig.ts'
import '#tests/graphql/builders/mocks.ts'

describe('testing login a11y', () => {
  beforeEach(() => {
    mockApplicationConfig({
      user_create_account: true,
      user_show_password_login: true,
      product_name: 'Zammad Test System',
    })
  })

  it('has no accessibility violations', async () => {
    const view = await visitView('/login')
    await expect(view.container).toBeAccessible()
  })
})
