// Copyright (C) 2024-2026 Dejoiy

import { expect } from 'vitest'

import { renderComponent } from '#tests/support/components/index.ts'

import CommonInlineEditButtons from '#desktop/components/CommonInlineEditButtons/CommonInlineEditButtons.vue'

describe('CommonInlineEditButtons', () => {
  it('emits events', async () => {
    const wrapper = renderComponent(CommonInlineEditButtons)

    await wrapper.events.click(wrapper.getByRole('button', { name: 'Cancel' }))
    await wrapper.events.click(wrapper.getByRole('button', { name: 'Save changes' }))

    expect(wrapper.emitted().cancel).toEqual(expect.objectContaining([]))
    expect(wrapper.emitted().submit).toEqual(expect.objectContaining([]))
  })
})
