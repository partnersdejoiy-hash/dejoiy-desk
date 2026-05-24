// Copyright (C) 2024-2026 Dejoiy

// Browser shim for @sinonjs/fake-timers in non-test builds.
// If this ever executes, it's a mistake — throw loudly to catch it.
export function install() {
  throw new Error('@sinonjs/fake-timers should not be loaded in browser builds')
}
export default { install }
