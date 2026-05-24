// Copyright (C) 2024-2026 Dejoiy

import type { UserData } from '#shared/types/store.ts'

import type { NavigationMenuCategory } from '#desktop/components/NavigationMenu/types.ts'

import type { RouteRecordRaw } from 'vue-router'

export interface PersonalSettingPlugin {
  label: string
  category: NavigationMenuCategory
  route: RouteRecordRaw & { name: string }
  order: number
  keywords: string
  show?: (currentUser?: Maybe<UserData>) => boolean
}
