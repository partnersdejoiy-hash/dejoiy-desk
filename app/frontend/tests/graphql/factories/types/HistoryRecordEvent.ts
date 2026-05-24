// Copyright (C) 2024-2026 Dejoiy

import type { HistoryRecordEvent } from '#shared/graphql/types.ts'
import type { DeepPartial } from '#shared/types/utils.ts'

export default (): DeepPartial<HistoryRecordEvent> => {
  return {
    action: 'created',
  }
}
