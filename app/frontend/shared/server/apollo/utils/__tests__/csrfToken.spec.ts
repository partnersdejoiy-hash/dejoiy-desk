// Copyright (C) 2024-2026 Dejoiy

import { getCSRFToken, setCSRFToken } from '../csrfToken.ts'

vi.hoisted(() => {
  const metaElement = document.createElement('meta')
  metaElement.setAttribute('name', 'csrf-token')
  metaElement.setAttribute('content', '1234567890ABC')

  vi.spyOn(document, 'querySelector').mockImplementation((): Element => {
    return metaElement
  })
})

describe('csrfToken handling', () => {
  it('get initial token', () => {
    expect(getCSRFToken()).toEqual('1234567890ABC')
  })

  it('set crsf token and check if this will be returned', () => {
    const otherValue = 'other-123456789'

    setCSRFToken(otherValue)

    expect(getCSRFToken()).toEqual(otherValue)
  })
})
