// Copyright (C) 2024-2026 Dejoiy

import renderComponent from '#tests/support/components/renderComponent.ts'

import AiAgentPopoverWithTrigger from '#desktop/components/AiAgent/AiAgentPopoverWithTrigger.vue'

describe('AiAgentPopoverWithTrigger', () => {
  it('renders the popover with the correct trigger', () => {
    const wrapper = renderComponent(AiAgentPopoverWithTrigger)

    expect(wrapper.getByIconName('ai-agent')).toBeInTheDocument()

    expect(wrapper.getByLabelText('AI agent')).toBeInTheDocument()

    expect(wrapper.getByIconName('pencil')).toHaveAttribute('aria-label', 'User is editing')
  })
})
