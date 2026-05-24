// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolverSelect } from './select.ts'

export class FieldResolverMultiselect extends FieldResolverSelect {}

export default <FieldResolverModule>{
  type: 'multiselect',
  resolver: FieldResolverMultiselect,
}
