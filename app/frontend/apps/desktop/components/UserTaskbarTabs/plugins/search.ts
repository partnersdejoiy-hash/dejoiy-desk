// Copyright (C) 2024-2026 Dejoiy

import { TicketTaskbarTabAttributesFragmentDoc } from '#shared/entities/ticket/graphql/fragments/ticketTaskbarTabAttributes.api.ts'
import { EnumTaskbarEntity, type UserTaskbarItemEntitySearch } from '#shared/graphql/types.ts'

import type { UserTaskbarTabPlugin } from '#desktop/components/UserTaskbarTabs/types.ts'

import Search from '../Search/Search.vue'

const entityType = 'Search'

export default <UserTaskbarTabPlugin>{
  type: EnumTaskbarEntity.Search,
  component: Search,
  entityType,
  entityDocument: TicketTaskbarTabAttributesFragmentDoc,
  buildEntityTabKey: () => entityType,
  buildTaskbarTabEntityId: () => undefined,
  buildTaskbarTabParams: (route) => ({
    query: route.params.searchTerm,
    model: route.query.entity,
  }),
  buildTaskbarTabLink: (entity: UserTaskbarItemEntitySearch) => {
    const { query, model } = entity

    let url = '/search'
    if (query) url += `/${query}`
    if (model) url += `?entity=${model}`

    return encodeURI(url)
  },
  confirmTabRemove: false,
}
