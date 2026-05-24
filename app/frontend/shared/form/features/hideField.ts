// Copyright (C) 2024-2026 Dejoiy

import type { FormKitNode } from '@formkit/core'

const hideField = (node: FormKitNode) => {
  node.addProps(['hidden'])

  node.on('created', () => {
    const { props } = node

    if (props.hidden) {
      props.outerClass = 'hidden'
    }

    node.on('prop:hidden', ({ payload }) => {
      if (payload) {
        props.outerClass = `${props.outerClass} hidden`
      } else if (props.outerClass) {
        props.outerClass = props.outerClass.replace('hidden', '')
      }
    })
  })
}

export default hideField
