// Copyright (C) 2024-2026 Dejoiy

import { onScopeDispose, getCurrentScope } from 'vue'

import emitter, { type Events } from '#shared/utils/emitter.ts'

export const useOnEmitter = <K extends keyof Events>(
  name: K,
  callback: (payload: Events[K]) => void,
) => {
  emitter.on(name, callback)

  if (getCurrentScope()) {
    onScopeDispose(() => {
      emitter.off(name, callback)
    })
  }
}
