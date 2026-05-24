// Copyright (C) 2024-2026 Dejoiy

import { textarea as textareaDefinition } from '@formkit/inputs'

import initializeFieldDefinition from '#shared/form/core/initializeFieldDefinition.ts'
import defaultEmptyValueString from '#shared/form/features/defaultEmptyValueString.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

initializeFieldDefinition(textareaDefinition, {
  features: [formUpdaterTrigger('delayed'), defaultEmptyValueString],
})

// TODO resizing as prop?

export default {
  fieldType: 'textarea',
  definition: textareaDefinition,
}
