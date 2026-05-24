// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import CommonOrganizationAvatar from '../CommonOrganizationAvatar.vue'

describe('CommonOrganizationAvatar', () => {
  it('renders avatar', async () => {
    const view = renderComponent(CommonOrganizationAvatar, {
      props: {
        entity: {
          name: 'Zammad Foundation',
          active: true,
        },
      },
    })

    expect(view.getByIconName('organization')).toBeInTheDocument()

    await view.rerender({
      entity: {
        name: 'Zammad Foundation',
        active: false,
      },
    })

    expect(view.getByIconName('inactive-organization')).toBeInTheDocument()
  })
})
