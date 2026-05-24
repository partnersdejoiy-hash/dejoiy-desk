// Copyright (C) 2024-2026 Dejoiy

import { ref } from 'vue'

import type { Tab } from '#desktop/components/CommonTabGroup/types.ts'

export const useTabGroup = <T = Tab[] | Tab['key']>() => {
  const activeTab = ref<T>()

  return { activeTab }
}
