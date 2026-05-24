// Copyright (C) 2024-2026 Dejoiy

import { hidden as hiddenDefinition } from '@formkit/inputs'

import initializeFieldDefinition from '#shared/form/core/initializeFieldDefinition.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

initializeFieldDefinition(hiddenDefinition, {
  features: [formUpdaterTrigger()],
})

export default {
  fieldType: 'hidden',
  definition: hiddenDefinition,
}
