// Copyright (C) 2024-2026 Dejoiy

import type { MenuItem } from '#desktop/components/CommonPopoverMenu/types.ts'

export interface DetailViewActionPlugin extends MenuItem {
  order: number
  /**
   * Top level means action will be rendered directly in the user info actions bar.
   */
  topLevel: boolean
  /**
   * Can be called to be within the component setup context
   */
  initialize?: <T>() => T
}
