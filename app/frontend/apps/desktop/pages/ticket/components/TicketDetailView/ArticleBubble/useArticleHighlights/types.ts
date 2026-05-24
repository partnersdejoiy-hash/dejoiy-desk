// Copyright (C) 2024-2026 Dejoiy

export type HighlightRange = {
  startIndex: number
  endIndex: number
  colorClass: string
}

export type SelectionContext = {
  selection: Selection
  startIndex: number
  endIndex: number
  anchors: Array<CharAnchor | null>
}

export type CharAnchor = { node: Text; charIndex: number }
