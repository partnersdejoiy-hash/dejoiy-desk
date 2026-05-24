// Copyright (C) 2024-2026 Dejoiy

import type { FormKitNode } from '@formkit/core'

const addBlurEvent = (node: FormKitNode) => {
  node.on('created', () => {
    if (!node.context) return

    const originalBlurHandler = node.context.handlers.blur as (e?: FocusEvent) => void

    node.context.handlers.blur = (event?: FocusEvent) => {
      node.emit('blur', node.context?.value)
      // if node was not destroyed
      if (node.context) {
        originalBlurHandler(event)
      }
    }
  })
}

export default addBlurEvent
