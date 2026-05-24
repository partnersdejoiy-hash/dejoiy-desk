// Copyright (C) 2024-2026 Dejoiy

import type { FilePreviewClassMap } from '#shared/components/CommonFilePreview/types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let filePreviewClasses: FilePreviewClassMap = {
  base: 'common-file-preview',
  wrapper: 'common-file-preview-wrapper',
  icon: 'common-file-preview-icon',
  preview: 'common-file-preview-preview',
  link: 'common-file-preview-link',
  size: 'common-file-preview-size',
}

export const initializeFilePreviewClasses = (classes: FilePreviewClassMap) => {
  filePreviewClasses = classes
}

export const getFilePreviewClasses = () => filePreviewClasses
