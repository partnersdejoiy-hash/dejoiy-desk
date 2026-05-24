// Copyright (C) 2024-2026 Dejoiy

import { renderComponent } from '#tests/support/components/index.ts'

import ConnectionLostDialog from '../ConnectionLostDialog.vue'

describe('ConnectionLostDialog', () => {
  it('renders the connection lost dialog', () => {
    const wrapper = renderComponent(ConnectionLostDialog, { router: true, dialog: true })

    expect(wrapper.getByRole('dialog')).toBeInTheDocument()
    expect(
      wrapper.getByRole('heading', { level: 3, name: 'Lost network connection' }),
    ).toBeInTheDocument()
    expect(wrapper.getByText('Trying to reconnect…')).toBeInTheDocument()
    expect(wrapper.getByIconName('wifi-off')).toBeInTheDocument()
  })
})
