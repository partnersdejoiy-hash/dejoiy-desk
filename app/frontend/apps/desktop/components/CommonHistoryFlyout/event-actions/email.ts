// Copyright (C) 2024-2026 Dejoiy

import HistoryEventDetailsEmail from '../HistoryEventDetails/HistoryEventDetailsEmail.vue'

import type { EventActionModule } from '../types.ts'

export default <EventActionModule>{
  name: 'email',
  actionName: 'email',
  component: HistoryEventDetailsEmail,
  content: (event) => {
    return {
      details: event.changes?.to,
    }
  },
}
