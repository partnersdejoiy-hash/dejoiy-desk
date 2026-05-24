// Copyright (C) 2024-2026 Dejoiy

import { createSection } from '@formkit/inputs'

export const block = createSection('block', () => {
  return {
    $el: 'div',
    attrs: {
      onClick: "$handlers.bindEmit('block-click')",
    },
  }
})
