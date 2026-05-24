// Copyright (C) 2024-2026 Dejoiy

import { computed, provide, toRef } from 'vue'
import { THEME_KEY } from 'vue-echarts'

import { EnumAppearanceTheme } from '#shared/graphql/types.ts'

import { useThemeStore } from '#desktop/stores/theme.ts'

export const useChartTheme = () => {
  const isDarkMode = toRef(useThemeStore(), 'isDarkMode')

  const colorTheme = computed(() =>
    isDarkMode.value ? EnumAppearanceTheme.Dark : EnumAppearanceTheme.Light,
  )

  // ⚠️ seems to not update theme within the library component
  // Currently styling is handled within the computed options of chart
  provide(THEME_KEY, colorTheme)

  return { colorTheme }
}
