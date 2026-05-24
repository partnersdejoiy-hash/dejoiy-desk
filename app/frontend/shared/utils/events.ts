// Copyright (C) 2024-2026 Dejoiy

import type { StopEventOptions } from '#shared/types/events.ts'

const stopEvent = (event: Event, stopOptions: StopEventOptions = {}): void => {
  const {
    preventDefault = true,
    propagation = true,
    immediatePropagation = false,
  }: StopEventOptions = stopOptions

  if (preventDefault) {
    event.preventDefault()
  }
  if (propagation) {
    event.stopPropagation()
  }
  if (immediatePropagation) {
    event.stopImmediatePropagation()
  }
}

export default stopEvent
