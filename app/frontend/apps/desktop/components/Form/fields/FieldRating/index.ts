// Copyright (C) 2024-2026 Dejoiy

import { has } from 'lodash-es'

import createInput from '#shared/form/core/createInput.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

import FieldRatingInput from './FieldRatingInput.vue'

import type { HorizontalAlignment } from './types.ts'
import type { FormKitNode } from '@formkit/core'

const handleAlignmentClasses = (node: FormKitNode) => {
  const { props } = node

  const setClasses = (alignment: HorizontalAlignment) => {
    props.labelClass = `text-${alignment}`
    props.innerClass = `flex justify-${alignment}`
  }

  node.on('created', () => {
    if (!has(props, 'alignment')) props.alignment = 'center'

    setClasses(props.alignment)

    node.on('prop:alignment', ({ payload }) => {
      setClasses(payload)
    })
  })
}

const fieldDefinition = createInput(FieldRatingInput, ['alignment'], {
  features: [formUpdaterTrigger(), handleAlignmentClasses],
})

export default {
  fieldType: 'rating',
  definition: fieldDefinition,
}
