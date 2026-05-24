// Copyright (C) 2024-2026 Dejoiy

import type { ToggleClassMap } from './types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let toggleClasses: ToggleClassMap = {
  track: 'field-toggle-track',
  trackOn: 'field-toggle-track--on',
  knob: 'field-toggle-knob',
}

export const initializeToggleClasses = (classes: ToggleClassMap) => {
  toggleClasses = classes
}

export const getToggleClasses = () => toggleClasses
