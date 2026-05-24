// Copyright (C) 2024-2026 Dejoiy

import createValidationPlugin, {
  getValidationRuleMessages,
} from '#shared/form/core/createValidationPlugin.ts'

describe('createValidationPlugin', () => {
  it('check that validation plugin will be returned', () => {
    const validationPlugin = createValidationPlugin()

    expect(typeof validationPlugin).toEqual('function')
  })
})

describe('getValidationRuleMessages', () => {
  it('get validation messages from custom rules', () => {
    const validationRuleMessages = getValidationRuleMessages()

    expect(validationRuleMessages).toEqual({
      date_range: expect.any(Function),
    })
  })
})
