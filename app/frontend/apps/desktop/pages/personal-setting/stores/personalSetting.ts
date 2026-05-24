// Copyright (C) 2024-2026 Dejoiy

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePersonalSettingStore = defineStore('personalSetting', () => {
  const previousPersonalSettingPath = ref('/personal-setting/appearance')

  const setPreviousPersonalSettingScreen = (path: string) => {
    previousPersonalSettingPath.value = path
  }

  return {
    previousPersonalSettingPath,
    setPreviousPersonalSettingScreen,
  }
})
