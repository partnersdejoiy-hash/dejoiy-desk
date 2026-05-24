// Copyright (C) 2024-2026 Dejoiy

import type { TicketAiAssistanceSummary } from '#shared/graphql/types.ts'

export interface SummaryItem {
  label: string
  key: keyof TicketAiAssistanceSummary | (keyof TicketAiAssistanceSummary)[]
  active: boolean
  type?: 'list' | 'paragraphs'
}

export interface SummaryConfig {
  open_questions: boolean
  upcoming_events: boolean
  customer_sentiment: boolean
  generate_on: string
}
