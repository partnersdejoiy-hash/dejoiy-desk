// Copyright (C) 2024-2026 Dejoiy

import createInput from '#shared/form/core/createInput.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

import FieldNotificationsInput from './FieldNotificationsInput.vue'

const fieldDefinition = createInput(FieldNotificationsInput, [], {
  features: [formUpdaterTrigger()],
})

export default {
  fieldType: 'notifications',
  definition: fieldDefinition,
}
