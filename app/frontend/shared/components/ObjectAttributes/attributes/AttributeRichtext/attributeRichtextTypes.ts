// Copyright (C) 2024-2026 Dejoiy

import type { ObjectAttribute } from '#shared/entities/object-attributes/types/store.ts'

export interface ObjectAttributeRichtext extends ObjectAttribute {
  dataType: 'richtext'
  dataOption: {
    maxlength: number
    no_images: boolean
    note: string
    null: boolean
    upload?: boolean
    rows?: number
    type: string // text
  }
}
