// Copyright (C) 2024-2026 Dejoiy

import extendSchemaDefinition from '#shared/form/utils/extendSchemaDefinition.ts'

import type { FormKitNode } from '@formkit/core'

const extendLabel = (node: FormKitNode) => {
  extendSchemaDefinition(node, 'label', {
    attrs: {
      id: '$: "label-" + $id',
    },
  })
}

export default extendLabel
