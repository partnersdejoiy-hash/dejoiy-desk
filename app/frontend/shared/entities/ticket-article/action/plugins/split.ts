// Copyright (C) 2024-2026 Dejoiy

import type { TicketArticleActionPlugin, TicketArticleAction } from './types.ts'

const actionPlugin: TicketArticleActionPlugin = {
  order: 700,

  addActions(_ticket, article) {
    const action: TicketArticleAction = {
      apps: ['desktop'],
      label: __('Split'),
      name: 'split',
      icon: 'split',
      view: {
        agent: ['read'],
      },
      link: `/tickets/create?splitTicketArticleId=${encodeURIComponent(article.id)}`,
    }

    return [action]
  },
}

export default actionPlugin
