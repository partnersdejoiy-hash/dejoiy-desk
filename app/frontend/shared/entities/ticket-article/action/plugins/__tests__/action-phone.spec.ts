// Copyright (C) 2024-2026 Dejoiy

import { setupView } from '#tests/support/mock-user.ts'

import { createTestArticleTypes, createTicket } from './utils.ts'

describe('phone type', () => {
  it('customer cannot use phone type', () => {
    setupView('customer')
    const ticket = createTicket()
    const actions = createTestArticleTypes(ticket)
    expect(actions.find((a) => a.value === 'phone')).toBeUndefined()
  })

  it('agents can use phone type', () => {
    setupView('agent')
    const ticket = createTicket()
    const actions = createTestArticleTypes(ticket)
    expect(actions.find((a) => a.value === 'phone')).toBeDefined()
  })
})
