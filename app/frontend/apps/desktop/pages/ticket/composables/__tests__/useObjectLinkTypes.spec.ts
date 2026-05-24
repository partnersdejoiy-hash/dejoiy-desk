// Copyright (C) 2024-2026 Dejoiy

import { useObjectLinkTypes } from '../useObjectLinkTypes.ts'

describe('useObjectLinkTypes', () => {
  it('returns link types', async () => {
    const { linkTypes } = useObjectLinkTypes()

    expect(linkTypes).toEqual([
      {
        value: 'normal',
        label: 'Normal',
      },
      {
        value: 'child',
        label: 'Child',
      },
      {
        value: 'parent',
        label: 'Parent',
      },
    ])
  })
})
