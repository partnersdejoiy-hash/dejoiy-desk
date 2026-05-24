// Copyright (C) 2024-2026 Dejoiy

import type { FormValues } from '#shared/components/Form/types.ts'

// oxlint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TaskbarTabDetailDataLoader {}

export type TaskbarTabDetailDataLoaderComposable = () => TaskbarTabDetailDataLoader

export interface TaskbarTabContext {
  formValues?: FormValues
  formIsDirty?: boolean
  formIsSettled?: boolean

  // Add generic properties to the context (e.g. overview information in ticket detail view context).
  [index: string]: unknown
}
