// Copyright (C) 2024-2026 Dejoiy

import type { FormKitNode } from '@formkit/core'

const defaultEmptyValueString = (node: FormKitNode) => {
  node.hook.input((payload, next) => {
    if (payload === undefined || payload === null) {
      return next('')
    }
    return next(payload)
  })
}

export default defaultEmptyValueString
