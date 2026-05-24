// Copyright (C) 2024-2026 Dejoiy

import { activityMessageBuilder } from '../index.ts'

describe('activity message builder are available', () => {
  it('should return all search plugins', () => {
    const builderList = activityMessageBuilder

    const models = Object.keys(builderList)

    expect(models).toContain('Ticket')
    expect(models).toContain('User')
    expect(models).toContain('Organization')
    expect(models).toContain('Group')
  })
})
