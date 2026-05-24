// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

import FieldToggleButtonsInput from './FieldToggleButtonsInput.vue'

const fieldDefinition = createInput(FieldToggleButtonsInput, ['options'], {
  features: [formUpdaterTrigger()],
})

export default {
  fieldType: 'toggleButtons',
  definition: fieldDefinition,
}
