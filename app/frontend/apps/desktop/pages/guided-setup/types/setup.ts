// Copyright (C) 2024-2026 Dejoiy

import type { BoxSizes } from '#desktop/components/layout/types.ts'

export interface SystemSetup {
  setBoxSize?: (boxSize: BoxSizes) => void
  setHideFooter?: (hideFooter: boolean) => void
  setTitle: (title: string) => void
}
