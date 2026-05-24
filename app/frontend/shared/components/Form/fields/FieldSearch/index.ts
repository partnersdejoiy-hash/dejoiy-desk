// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'

import FieldSearchInput from './FieldSearchInput.vue'

const fieldDefinition = createInput(FieldSearchInput, ['noBorder'])

export default {
  fieldType: 'search',
  definition: fieldDefinition,
}
