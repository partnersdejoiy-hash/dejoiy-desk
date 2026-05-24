// Copyright (C) 2024-2026 Dejoiy
import type { TicketArticle } from '#shared/entities/ticket/types.ts'

import type { Component, Ref } from 'vue'

export interface ChannelField {
  name: string
  label: string
  order: number
  show?: (article: Ref<TicketArticle>) => boolean
  icon?: string
  component?: Component
}

export interface ChannelModule {
  name: string
  label: string
  metaLabel: string
  icon: string
  additionalFields?: ChannelField[]
  channel?: {
    component: Component
  }
}

export type ArticleTypeName =
  | 'chat'
  | 'email'
  | 'facebook direct message'
  | 'facebook feed comment'
  | 'facebook feed post'
  | 'fax'
  | 'note'
  | 'phone'
  | 'sms'
  | 'telegram personal message'
  | 'twitter direct message'
  | 'twitter status'
  | 'web'
  | 'whatsapp message'
