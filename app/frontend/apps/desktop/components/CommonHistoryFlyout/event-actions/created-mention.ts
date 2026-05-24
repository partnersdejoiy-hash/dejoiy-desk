// Copyright (C) 2024-2026 Dejoiy

import type { User } from '#shared/graphql/types.ts'

import type { EventActionModule } from '../types.ts'

export default <EventActionModule>{
  name: 'created-mention',
  actionName: 'created',
  content: (event) => {
    return {
      description: __('Mention for'),
      details: event.object?.__typename === 'User' ? (event.object as User).fullname : '-',
    }
  },
}
