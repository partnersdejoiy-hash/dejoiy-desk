// Copyright (C) 2024-2026 Dejoiy

import useFingerprint from '../useFingerprint.ts'

const generateFingerprintSpy = vi.fn()

vi.mock('#shared/utils/browser.ts', () => {
  return {
    generateFingerprint: () => {
      generateFingerprintSpy()
      return '123456789'
    },
  }
})

describe('useFingerprint', () => {
  afterEach(() => {
    generateFingerprintSpy.mockRestore()
  })

  it('generate new fingerprint', () => {
    const { fingerprint } = useFingerprint()

    expect(fingerprint.value).toBe('123456789')
    expect(generateFingerprintSpy).toHaveBeenCalledTimes(1)
  })

  it('fingerprint is used from local storage', () => {
    const { fingerprint } = useFingerprint()

    expect(fingerprint.value).toBe('123456789')
    expect(generateFingerprintSpy).toHaveBeenCalledTimes(0)
  })
})
