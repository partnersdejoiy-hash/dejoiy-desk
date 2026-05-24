// Copyright (C) 2024-2026 Dejoiy

import type { BadgeClassMap } from '#shared/components/CommonBadge/types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let badgeClasses: BadgeClassMap = {
  base: 'common-badge',
  danger: 'common-badge-danger',
  info: 'common-badge-info',
  success: 'common-badge-success',
  warning: 'common-badge-warning',
  neutral: 'common-badge-neutral',
  tertiary: 'common-badge-tertiary',
  highlight: 'common-badge-highlight',
  custom: 'common-badge-custom',
}

export const initializeBadgeClasses = (classes: BadgeClassMap) => {
  badgeClasses = classes
}

export const getBadgeClasses = () => badgeClasses
