// Copyright (C) 2024-2026 Dejoiy

import type {
  EditorButton,
  EditorContentType,
} from '#shared/components/Form/fields/FieldEditor/types.ts'

import type { Editor } from '@tiptap/core'
import type { Component } from 'vue'

export interface ActionMenuProps {
  actions: EditorButton[] | Component
  contentType: EditorContentType
  editor?: Editor
  visible?: boolean
  isActive?: (type: string, attributes?: Record<string, unknown>) => boolean
  typeName?: string
  targetId?: string
}
