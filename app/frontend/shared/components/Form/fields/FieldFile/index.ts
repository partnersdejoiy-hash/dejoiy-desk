// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'

import { filesSizeError } from './features/filesSizeError.ts'
import { filesTypeError } from './features/filesTypeError.ts'
import { multipleFilesError } from './features/multipleFilesError.ts'
import FieldFileInput from './FieldFileInput.vue'

const fieldDefinition = createInput(
  FieldFileInput,
  ['multiple', 'capture', 'accept', 'allowedFiles'],
  {
    features: [multipleFilesError, filesSizeError, filesTypeError],
  },
)

export default {
  fieldType: 'file',
  definition: fieldDefinition,
}
