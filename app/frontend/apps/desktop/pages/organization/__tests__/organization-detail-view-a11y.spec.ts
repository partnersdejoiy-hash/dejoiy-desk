// Copyright (C) 2024-2026 Dejoiy

import { visitView } from '#tests/support/components/visitView.ts'
import { mockPermissions } from '#tests/support/mock-permissions.ts'

describe('Organization Detail View', () => {
  it('has no accessibility violations in main content', async () => {
    mockPermissions(['ticket.agent'])

    const view = await visitView('/organizations/1')

    await expect(view.container).toBeAccessible()
  })
})
