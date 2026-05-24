// Copyright (C) 2024-2026 Dejoiy

import { EnumObjectManagerObjects } from '#shared/graphql/types.ts'

import { FieldResolverBoolean } from '../boolean.ts'

describe('FieldResolverBoolean', () => {
  it('should return the correct field attributes', () => {
    const fieldResolver = new FieldResolverBoolean(EnumObjectManagerObjects.Ticket, {
      dataType: 'boolean',
      name: 'correct',
      display: 'Correct?',
      dataOption: {
        options: { false: 'no', true: 'yes' },
      },
      isInternal: true,
    })

    expect(fieldResolver.fieldAttributes()).toEqual({
      label: 'Correct?',
      name: 'correct',
      required: false,
      props: {
        variants: {
          false: 'no',
          true: 'yes',
        },
      },
      value: false,
      type: 'toggle',
      internal: true,
      wrapperClass: '@lg/form-group:mt-6',
    })
  })
})
