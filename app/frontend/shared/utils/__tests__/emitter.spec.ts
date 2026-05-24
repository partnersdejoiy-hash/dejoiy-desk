// Copyright (C) 2024-2026 Dejoiy

import emitter from '../emitter.ts'

describe('emitter', () => {
  it('check working emitter object', () => {
    const emitCallbackSpy = vi.fn()

    emitter.on('session-invalid', emitCallbackSpy)

    emitter.emit('session-invalid')

    expect(emitCallbackSpy).toHaveBeenCalled()
  })
})
