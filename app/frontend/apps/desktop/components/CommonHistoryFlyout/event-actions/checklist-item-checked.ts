// Copyright (C) 2024-2026 Dejoiy

import type { EventActionModule } from '../types.ts'

export default <EventActionModule>{
  name: 'checklist-item-checked',
  actionName: (event) => (event.changes?.to === 'true' ? 'checked' : 'unchecked'),
  content: (event) => {
    return {
      entityName: __('Checklist item'),
      details: event.changes?.from || '',
    }
  },
}
