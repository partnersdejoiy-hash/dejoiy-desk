// Copyright (C) 2024-2026 Dejoiy

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 */
export enum KeyboardKey {
  Escape = 'escape',
  Shift = 'shift',
  Enter = 'enter',
  Control = 'control',
  Alt = 'alt',
}

export interface OrderKeyHandlerConfig {
  handler: () => void
  key: string
  beforeHandlerRuns?: () => boolean | Promise<boolean> | void
}
