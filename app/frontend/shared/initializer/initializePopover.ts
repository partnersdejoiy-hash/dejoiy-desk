// Copyright (C) 2024-2026 Dejoiy

// Classes
let popoverClasses = {
  base: '',
  arrow: '',
}

export const initializePopoverClasses = (classes: typeof popoverClasses) => {
  popoverClasses = classes
}
export const getPopoverClasses = () => popoverClasses
