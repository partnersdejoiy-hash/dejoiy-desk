// Copyright (C) 2024-2026 Dejoiy

import type { FormSubmitData } from '#shared/components/Form/types.ts'
import type { EnumBetaUiFeedbackType } from '#shared/graphql/types.ts'

interface FeedbackData {
  rating: number
  comment: string
  fqdn: string
  timeSpent: number
  type: EnumBetaUiFeedbackType
}

type FormData = Pick<FeedbackData, 'rating' | 'comment'> & {
  /**
   * Will be not submitted to the backend.
   * Client side flag
   */
  neverAskAgain: boolean
}

export type FeedbackFormData = FormSubmitData<FormData>
