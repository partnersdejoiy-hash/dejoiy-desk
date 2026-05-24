// Copyright (C) 2024-2026 Dejoiy

import type { ComputedGetter } from 'vue'

export interface TimeTrackerOptions {
  /**
   * @tickTime Interval in milliseconds
   */
  tickTime?: number
  enabled?: ComputedGetter<boolean | undefined>
}

export type MilestoneKey = '1h' | '5h' | '20h'

export type MilestoneRecords = Record<MilestoneKey, { reached: boolean; triggerHistory: boolean }>

export type MilestonesHistoryRecords = Record<MilestoneKey, boolean>
