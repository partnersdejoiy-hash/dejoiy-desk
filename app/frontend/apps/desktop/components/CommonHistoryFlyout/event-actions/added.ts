// Copyright (C) 2024-2026 Dejoiy

import { capitalize } from '#shared/utils/formatter.ts'

import { getEntityNameFromObject } from '../utils/eventHelpers.ts'

import type { EventActionModule } from '../types.ts'

export default <EventActionModule>{
  name: 'added',
  actionName: 'added',
  content: (event) => {
    const { attribute } = event

    return {
      entityName: getEntityNameFromObject(event.object),
      attributeName: attribute ? capitalize(attribute) : '',
      details: event.changes?.to || '',
    }
  },
}
