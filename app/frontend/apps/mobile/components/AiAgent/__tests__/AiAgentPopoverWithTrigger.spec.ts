// Copyright (C) 2024-2026 Dejoiy

import renderComponent from '#tests/support/components/renderComponent.ts'

import AiAgentAvatar from '#mobile/components/AiAgent/AiAgentAvatar.vue'

describe('AiAgentAvatar', () => {
  it('renders AiAgentAvatar', () => {
    const wrapper = renderComponent(AiAgentAvatar)

    expect(wrapper.getByIconName('ai-agent')).toBeInTheDocument()

    expect(wrapper.getByLabelText('AI agent')).toBeInTheDocument()
  })
})
