// Copyright (C) 2024-2026 Dejoiy

import type { LinkClassMap } from '#shared/components/CommonLink/types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let linkClasses: LinkClassMap = {
  base: 'common-link',
  internal: 'common-link-internal',
}

export const initializeLinkClasses = (classes: LinkClassMap) => {
  linkClasses = classes
}

export const getLinkClasses = () => linkClasses
