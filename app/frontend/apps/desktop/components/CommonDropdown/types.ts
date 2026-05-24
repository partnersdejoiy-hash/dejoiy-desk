// Copyright (C) 2024-2026 Dejoiy

import type { MenuItem } from '#desktop/components/CommonPopoverMenu/types.ts'

export type DropdownItem = Omit<MenuItem, 'onClick'>
