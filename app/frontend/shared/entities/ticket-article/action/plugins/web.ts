// Copyright (C) 2024-2026 Dejoiy

import type { TicketArticleActionPlugin, TicketArticleType } from './types.ts'

const actionPlugin: TicketArticleActionPlugin = {
  order: 100,

  addTypes() {
    const type: TicketArticleType = {
      apps: ['mobile', 'desktop'],
      value: 'web',
      label: __('Web'),
      buttonLabel: __('Add reply'),
      icon: 'web',
      view: {
        customer: ['change'],
      },
      fields: {
        attachments: {},
      },
      internal: false,
    }
    return [type]
  },
}

export default actionPlugin
