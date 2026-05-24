// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolver } from '../FieldResolver.ts'

export class FieldResolverTextarea extends FieldResolver {
  fieldType = 'textarea'

  public fieldTypeAttributes() {
    return {
      props: {
        maxlength: this.attributeConfig.maxlength,
        rows: this.attributeConfig.rows,
      },
    }
  }
}

export default <FieldResolverModule>{
  type: 'textarea',
  resolver: FieldResolverTextarea,
}
