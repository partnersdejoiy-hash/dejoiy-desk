// Copyright (C) 2024-2026 Dejoiy

import { ref } from 'vue'

const loaded = ref(false)

export const useApplicationLoaded = () => {
  return {
    loaded,
  }
}
