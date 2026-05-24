// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import TicketListPopoverSkeleton from '../TicketListPopoverSkeleton.vue'

describe('TicketListPopoverSkeleton', () => {
  it('renders the skeleton correctly', () => {
    const wrapper = renderComponent(TicketListPopoverSkeleton, {
      props: { loading: true },
    })

    expect(wrapper.getAllByRole('progressbar').length).toBe(6)
  })
})
