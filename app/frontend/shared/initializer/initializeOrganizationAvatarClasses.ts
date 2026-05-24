// Copyright (C) 2024-2026 Dejoiy

import type { OrganizationAvatarClassMap } from '#shared/components/CommonOrganizationAvatar/types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let organizationAvatarClasses: OrganizationAvatarClassMap = {
  base: 'common-organization-avatar-base',
  inactive: 'common-organization-avatar-inactive',
}

export const initializeOrganizationAvatarClasses = (classes: OrganizationAvatarClassMap) => {
  organizationAvatarClasses = classes
}

export const getOrganizationAvatarClasses = () => organizationAvatarClasses
