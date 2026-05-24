// Copyright (C) 2024-2026 Dejoiy

import { reactive } from 'vue'

import type { ObjectLike } from '#shared/types/utils.ts'

export const usePersistentStates = () => {
  const persistentStates = reactive<ObjectLike>({})

  return { persistentStates }
}
