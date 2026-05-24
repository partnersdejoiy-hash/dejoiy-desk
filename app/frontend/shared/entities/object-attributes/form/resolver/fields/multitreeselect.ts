// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolverTreeselect } from './treeselect.ts'

export class FieldResolverMultiTreeselect extends FieldResolverTreeselect {}

export default <FieldResolverModule>{
  type: 'multi_tree_select',
  resolver: FieldResolverMultiTreeselect,
}
