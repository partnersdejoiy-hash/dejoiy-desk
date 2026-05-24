// Copyright (C) 2024-2026 Dejoiy

import { EnumTaskbarEntity } from '#shared/graphql/types.ts'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/organizations/:internalId(\\d+)',
  name: 'OrganizationDetailView',
  props: true,
  component: () => import('./views/OrganizationDetailView.vue'),
  alias: '/organization/profile/:internalId(\\d+)',
  meta: {
    title: __('Organization'),
    requiresAuth: true,
    requiredPermission: ['ticket.agent', 'admin.organization'],
    taskbarTabEntity: EnumTaskbarEntity.OrganizationProfile,
    isTaskbarTabPossible: (route) => !!route.params.internalId,
    messageForbidden: __('You have insufficient rights to view this organization.'),
    messageNotFound: __(
      'Organization with specified ID was not found. Try checking the URL for errors.',
    ),
    level: 2,
  },
}

export default routes
