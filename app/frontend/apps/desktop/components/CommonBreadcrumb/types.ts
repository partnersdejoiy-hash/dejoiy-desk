// Copyright (C) 2024-2026 Dejoiy

import type { Link } from '#shared/types/router.ts'

import type { ComputedRef } from 'vue'

export interface BreadcrumbItem {
  label: string | ComputedRef<string>
  noOptionLabelTranslation?: boolean
  route?: Link
  icon?: string
  count?: number
  isActive?: boolean
}
