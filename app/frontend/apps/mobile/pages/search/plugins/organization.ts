// Copyright (C) 2024-2026 Dejoiy

import OrganizationItem from '#mobile/components/Organization/OrganizationItem.vue'

import type { SearchPlugin } from './index.ts'

export default <SearchPlugin>{
  model: 'Organization',
  headerLabel: __('Organizations'),
  searchLabel: __('Organizations with "%s"'),
  component: OrganizationItem,
  link: '/organizations/#{internalId}',
  permissions: ['ticket.agent'],
  order: 300,
  icon: { name: 'organization', size: 'base' },
  iconBg: 'bg-orange',
}
