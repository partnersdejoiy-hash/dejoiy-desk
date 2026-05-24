// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import CommonContentPanel from '../CommonContentPanel.vue'

describe('CommonContentPanel.vue', () => {
  it('renders CommonContentPanel', () => {
    const wrapper = renderComponent(CommonContentPanel, {
      slots: {
        default: 'some content',
      },
    })

    expect(wrapper.getByText('some content')).toBeInTheDocument()
  })
})
