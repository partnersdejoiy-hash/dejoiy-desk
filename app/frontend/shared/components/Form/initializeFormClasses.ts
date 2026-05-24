// Copyright (C) 2024-2026 Dejoiy

import type { FormClassMap } from './types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let formClasses: FormClassMap = {
  loading: 'form-loading',
}

export const initializeFormClasses = (classes: FormClassMap) => {
  formClasses = classes
}

export const getFormClasses = () => formClasses
