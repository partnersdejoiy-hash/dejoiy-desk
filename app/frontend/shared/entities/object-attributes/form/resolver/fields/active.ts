// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolver } from '../FieldResolver.ts'

export class FieldResolverActive extends FieldResolver {
  fieldType = 'toggle'

  public fieldTypeAttributes() {
    return {
      props: {
        variants: {
          true: __('yes'),
          false: __('no'),
        },
      },
    }
  }
}

export default <FieldResolverModule>{
  type: 'active',
  resolver: FieldResolverActive,
}
