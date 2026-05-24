// Copyright (C) 2024-2026 Dejoiy

import type { TicketArticle } from '#shared/entities/ticket/types.ts'

export interface ChannelMetaField {
  label: string
  name: string
  component: unknown
  links?: { label: string; api: boolean; url: string; target: string }[]
  icon?: string
  order: number
  value?: unknown
  props?: Record<string, unknown>
  show?: (article: TicketArticle) => boolean
}

export type MetaHeader = 'from' | 'to' | 'cc'
