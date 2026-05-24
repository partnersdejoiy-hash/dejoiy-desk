// Copyright (C) 2024-2026 Dejoiy

import { install, type Clock } from '@sinonjs/fake-timers'

const useFakeTimers = (config: { now: Date }) => {
  const clock = install(config) as Clock & { restore(): void }
  clock.restore = clock.uninstall
  return clock
}
// support old-style sinon.useFakeTimers instead of overriding a method for mobile tests
Reflect.set(globalThis, 'sinon', { useFakeTimers })
