// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'

import FieldSecurityInput from './FieldSecurityInput.vue'

const fieldDefinition = createInput(FieldSecurityInput, [
  'securityAllowed',
  'securityDefaultOptions',
  'securityMessages',
])

export default {
  fieldType: 'security',
  definition: fieldDefinition,
}
