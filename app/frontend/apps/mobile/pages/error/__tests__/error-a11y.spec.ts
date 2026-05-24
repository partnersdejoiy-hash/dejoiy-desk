// Copyright (C) 2024-2026 Dejoiy

import { visitView } from '#tests/support/components/visitView.ts'

describe('testing error a11y', () => {
  it('has no accessibility violations', async () => {
    const view = await visitView('/error')
    await expect(view.container).toBeAccessible()
  })
})
