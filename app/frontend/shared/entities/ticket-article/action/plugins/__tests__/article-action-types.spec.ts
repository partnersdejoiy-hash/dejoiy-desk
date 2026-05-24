// Copyright (C) 2024-2026 Dejoiy

import { mockPermissions } from '#tests/support/mock-permissions.ts'

import { createTestArticleTypes, createTicket } from './utils.ts'

describe('article action plugins - types', () => {
  it('successfully returns available types', () => {
    mockPermissions(['ticket.customer'])
    const ticket = createTicket()
    const types = createTestArticleTypes(ticket)
    expect(types).toHaveLength(1)
    expect(types[0]).toMatchObject({
      value: 'web',
      fields: {
        attachments: {},
      },
    })
  })
})
