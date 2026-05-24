// Copyright (C) 2024-2026 Dejoiy

import type { ObjectAttributeValue } from '#shared/graphql/types.ts'

import type { PartialDeep } from 'type-fest'

export interface EntityObject {
  // oxlint-disable-next-line no-explicit-any
  [index: string]: any
  objectAttributeValues?: Maybe<Array<PartialDeep<ObjectAttributeValue>>>
}
