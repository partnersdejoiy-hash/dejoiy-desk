// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'

import FieldGroupPermissionsInput from './FieldGroupPermissionsInput.vue'

const fieldDefinition = createInput(FieldGroupPermissionsInput, ['options'])

export default {
  fieldType: 'groupPermissions',
  definition: fieldDefinition,
}
