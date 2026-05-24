// Copyright (C) 2024-2026 Dejoiy

export type PlaceholderRenderType = 'datetime' | 'link' | 'label' | 'badge'

export interface RenderPlaceholder {
  type: PlaceholderRenderType
  props?: Record<string, unknown>
  content?: string
}
