// Copyright (C) 2024-2026 Dejoiy

import type { FileClassMap } from './types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let fileClasses: FileClassMap = {
  button: 'field-file-button',
  listContainer: 'field-file-list-container',
}

export const initializeFileClasses = (classes: FileClassMap) => {
  fileClasses = classes
}

export const getFileClasses = () => fileClasses
