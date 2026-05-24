// Copyright (C) 2024-2026 Dejoiy

import { EnumObjectManagerObjects } from '#shared/graphql/types.ts'

import { FieldResolverDate } from '../date.ts'

const now = new Date('2026-02-08T12:00:00Z')

describe('FieldResolverDate', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(now)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return the correct field attributes', () => {
    const fieldResolver = new FieldResolverDate(EnumObjectManagerObjects.Ticket, {
      dataType: 'date',
      name: 'date',
      display: 'Date',
      dataOption: {
        diff: 24,
        null: true,
      },
      isInternal: true,
    })

    expect(fieldResolver.fieldAttributes()).toEqual({
      label: 'Date',
      name: 'date',
      required: false,
      props: {
        clearable: true,
      },
      type: 'date',
      internal: true,
      value: '2026-02-09',
    })
  })
})
