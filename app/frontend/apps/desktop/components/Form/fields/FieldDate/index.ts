// Copyright (C) 2024-2026 Dejoiy

import { dateFieldProps } from '#shared/components/Form/fields/FieldDate/types.ts'
import createInput from '#shared/form/core/createInput.ts'
import addLink from '#shared/form/features/addLink.ts'
import formUpdaterTrigger from '#shared/form/features/formUpdaterTrigger.ts'

import FieldDateTimeInput from './FieldDateTimeInput.vue'

const dateFieldDefinition = createInput(FieldDateTimeInput, dateFieldProps, {
  features: [addLink, formUpdaterTrigger()],
})

export default [
  {
    fieldType: 'date',
    definition: dateFieldDefinition,
  },
  {
    fieldType: 'datetime',
    definition: dateFieldDefinition,
  },
]
