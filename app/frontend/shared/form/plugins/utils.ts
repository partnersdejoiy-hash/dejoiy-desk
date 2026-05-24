// Copyright (C) 2024-2026 Dejoiy

export type Classes = Record<string, string>

export const clean = (str: string) => str.replace(/\s{2,}/g, ' ').trim()
export const extendClasses = (originalClasses: Classes | undefined, newClasses: Classes) => {
  const mergedClasses = { ...newClasses }

  Object.entries(originalClasses || {}).forEach(([type, originalClass]) => {
    if (!(type in mergedClasses)) {
      mergedClasses[type] = originalClass
    } else {
      mergedClasses[type] = clean(`${originalClass || ''} ${newClasses[type] || ''}`)
    }
  })

  return mergedClasses
}
