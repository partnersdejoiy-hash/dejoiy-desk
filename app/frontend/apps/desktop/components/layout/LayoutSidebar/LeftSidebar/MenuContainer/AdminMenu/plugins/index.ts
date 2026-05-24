// Copyright (C) 2024-2026 Dejoiy

import type { AdminMenuItem } from '#desktop/components/layout/LayoutSidebar/LeftSidebar/types.ts'

const modules = import.meta.glob<AdminMenuItem>(['./*.ts', '!./index.ts'], {
  eager: true,
  import: 'default',
})

const adminModules = Object.entries(modules).map(([_, module]) => module)

export default adminModules.sort((m1, m2) => m1.order - m2.order)
