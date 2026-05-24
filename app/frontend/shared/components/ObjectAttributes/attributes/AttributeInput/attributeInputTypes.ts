// Copyright (C) 2024-2026 Dejoiy

import type { ObjectAttribute } from '#shared/entities/object-attributes/types/store.ts'

export interface ObjectAttributeInput extends ObjectAttribute {
  dataType: 'input'
  dataOption: {
    item_class: string
    maxlength: number
    autocapitalize?: boolean
    null: boolean
    type: 'text' | 'url' | 'email' | 'tel'
    linktemplate?: string
    note?: string
  }
}
