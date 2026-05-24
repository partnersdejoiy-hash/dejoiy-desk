// Copyright (C) 2024-2026 Dejoiy

import { beforeAll } from 'vitest'

import { renderComponent } from '#tests/support/components/index.ts'

import CommonPageHelp from '../CommonPageHelp.vue'

const renderPageHelp = (options: any = {}) => {
  return renderComponent(CommonPageHelp, {
    ...options,
    dialog: true,
    router: true,
  })
}

describe('CommonPageHelp.vue', () => {
  beforeAll(() => {
    const app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
  })

  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('show help button', async () => {
    const view = renderPageHelp({
      slots: {
        default: () => 'A help example.',
      },
    })

    expect(view.getByRole('button', { name: 'Help' })).toBeInTheDocument()
    expect(view.getByIconName('question-circle')).toBeInTheDocument()
  })

  it('opens help dialog', async () => {
    const view = renderPageHelp({
      slots: {
        default: () => 'A help example.',
      },
    })

    await view.events.click(view.getByRole('button', { name: 'Help' }))

    expect(await view.findByRole('dialog')).toBeInTheDocument()
    expect(await view.findByText('A help example.')).toBeInTheDocument()
  })
})
