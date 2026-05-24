// Copyright (C) 2024-2026 Dejoiy

import type { EditorButton } from '#shared/components/Form/fields/FieldEditor/types.ts'

export interface ExtendedEditorButton extends EditorButton {
  key: string
  noCloseOnClick: boolean
}
