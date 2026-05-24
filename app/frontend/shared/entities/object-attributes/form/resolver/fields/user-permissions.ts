// Copyright (C) 2024-2026 Dejoiy

import { useAppName } from '#shared/composables/useAppName.ts'
import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolver } from '../FieldResolver.ts'

export class FieldResolverUserPermissions extends FieldResolver {
  // NB: The user permissions field is currently supported only in desktop app.
  fieldType = useAppName() === 'desktop' ? 'toggleList' : 'hidden'

  public fieldTypeAttributes() {
    return {}
  }
}

export default <FieldResolverModule>{
  type: 'user_permission',
  resolver: FieldResolverUserPermissions,
}
