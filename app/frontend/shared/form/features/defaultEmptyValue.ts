// Copyright (C) 2024-2026 Dejoiy

import type { FormKitNode } from '@formkit/core'

const defaultEmptyValue = (node: FormKitNode) => {
  node.hook.input((payload, next) => {
    if (payload === undefined || payload === null) {
      return next(node.props.multiple ? [] : '')
    }
    return next(payload)
  })
}

export default defaultEmptyValue
