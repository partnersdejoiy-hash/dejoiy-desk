// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import TransitionViewNavigation from '../TransitionViewNavigation.vue'

describe('TransitionViewNavigation.vue', () => {
  it('renders the component', () => {
    const wrapper = renderComponent(TransitionViewNavigation)

    expect(wrapper.container).toBeInTheDocument()
  })
})
