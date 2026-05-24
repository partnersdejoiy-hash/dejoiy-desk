// Copyright (C) 2024-2026 Dejoiy

import type { FieldResolverModule } from '#shared/entities/object-attributes/types/resolver.ts'

import { FieldResolver } from '../FieldResolver.ts'

export class FieldResolverRichtext extends FieldResolver {
  fieldType = 'editor'

  public fieldTypeAttributes() {
    return {
      props: {
        extensionSet: 'basic',
        // Pass maxlength from dataOption to meta.footer for character count display limit
        meta: {
          footer: {
            maxlength: this.attributeConfig.maxlength ? +this.attributeConfig.maxlength : undefined,
          },
        },
      },
    }
  }
}

export default <FieldResolverModule>{
  type: 'richtext',
  resolver: FieldResolverRichtext,
}
