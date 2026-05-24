// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import SystemMessage from '#desktop/pages/ticket/components/TicketDetailView/SystemMessage.vue'

const renderWrapper = ({ subject, to }: { subject: string; to: string }) => {
  return renderComponent(SystemMessage, {
    router: true,
    props: { subject, to },
  })
}

describe('SystemMessage', () => {
  it('creates the component with enabled button', () => {
    const wrapper = renderWrapper({
      subject: 'message from system',
      to: 'foo bar',
    })
    expect(wrapper.getByText(/message from system/i)).toBeInTheDocument()
    expect(wrapper.getByText(/foo bar/i)).toBeInTheDocument()
  })
})
