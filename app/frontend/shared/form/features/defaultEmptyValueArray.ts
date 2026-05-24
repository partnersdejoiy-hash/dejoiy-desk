// Copyright (C) 2024-2026 Dejoiy

import type { FormKitNode } from '@formkit/core'

const defaultEmptyValueArray = (node: FormKitNode) => {
  node.hook.input((payload, next) => {
    if ((payload === undefined || payload === null) && node.props.multiple) {
      return next([])
    }
    return next(payload)
  })
}

export default defaultEmptyValueArray
