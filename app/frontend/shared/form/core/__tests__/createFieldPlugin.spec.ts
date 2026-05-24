// Copyright (C) 2024-2026 Dejoiy

import createFieldPlugin from '#shared/form/core/createFieldPlugin.ts'

describe('createFieldPlugin', () => {
  it('check that field plugin will be returned', () => {
    const fieldPlugin = createFieldPlugin()

    expect(typeof fieldPlugin).toEqual('function')
  })
})
