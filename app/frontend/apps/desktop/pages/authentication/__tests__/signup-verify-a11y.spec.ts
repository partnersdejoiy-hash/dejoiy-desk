// Copyright (C) 2024-2026 Dejoiy

import { visitView } from '#tests/support/components/visitView.ts'
import { mockApplicationConfig } from '#tests/support/mock-applicationConfig.ts'

describe('testing signup verify a11y', () => {
  beforeEach(() => {
    mockApplicationConfig({
      user_create_account: true,
    })
  })

  it('has no accessibility violations', async () => {
    const view = await visitView('/signup/verify')
    await expect(view.container).toBeAccessible()
  })
})
