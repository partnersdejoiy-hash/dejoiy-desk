// Copyright (C) 2024-2026 Dejoiy

import type { ObjectAttribute } from '#shared/entities/object-attributes/types/store.ts'

export interface ObjectAttributeTextarea extends ObjectAttribute {
  dataType: 'textarea'
  dataOption: {
    item_class: string
    maxlength: number
    linktemplate?: string
    null: boolean
  }
}
