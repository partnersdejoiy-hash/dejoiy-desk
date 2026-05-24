// Copyright (C) 2024-2026 Dejoiy

import type { MenuItem } from '#desktop/components/CommonPopoverMenu/types.ts'

export interface MenuState {
  activeMenuItem: MenuItem
  isActive: boolean
  isEraserActive: boolean
}

export type MenuStateUpdate = Partial<MenuState>
