// Copyright (C) 2024-2026 Dejoiy

import type { FieldLinkClassMap } from './types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let linkClasses: FieldLinkClassMap = {
  container: 'field-link-container',
  base: 'field-link-base',
  link: 'field-link-link',
}

export const initializeFieldLinkClasses = (classes: FieldLinkClassMap) => {
  linkClasses = classes
}

export const getFieldLinkClasses = () => linkClasses
