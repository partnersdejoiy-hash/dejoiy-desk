// Copyright (C) 2024-2026 Dejoiy

import { inject, type InjectionKey, provide } from 'vue'

import type { FieldEditorOptions } from '#desktop/components/Form/fields/FieldEditor/types.ts'

export const FIELD_EDITOR_OPTIONS = Symbol(
  'field-editor-options',
) as InjectionKey<FieldEditorOptions>

export const provideFieldEditorOptions = (options: FieldEditorOptions) =>
  provide(FIELD_EDITOR_OPTIONS, options)

export const useFieldEditorOptions = () => inject(FIELD_EDITOR_OPTIONS, { zIndex: '20' })
