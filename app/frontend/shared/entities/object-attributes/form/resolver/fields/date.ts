// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'
import { getTimestampWithDiff } from '#shared/utils/datetime.ts'

import { FieldResolver } from '../FieldResolver.ts'

export class FieldResolverDate extends FieldResolver {
  fieldType = 'date'

  public fieldTypeAttributes() {
    const value = this.attributeConfig.diff
      ? getTimestampWithDiff(this.attributeConfig.diff as number, 'hours', 'date')
      : undefined

    return {
      value,
      props: {
        clearable: !!this.attributeConfig.null,
      },
    }
  }
}

export default <FieldResolverModule>{
  type: 'date',
  resolver: FieldResolverDate,
}
