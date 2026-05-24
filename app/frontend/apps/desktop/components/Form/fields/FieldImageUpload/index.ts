// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'

import FieldImageUploadInput from './FieldImageUploadInput.vue'

const fieldDefinition = createInput(FieldImageUploadInput, ['placeholderImagePath'])

export default {
  fieldType: 'imageUpload',
  definition: fieldDefinition,
}
