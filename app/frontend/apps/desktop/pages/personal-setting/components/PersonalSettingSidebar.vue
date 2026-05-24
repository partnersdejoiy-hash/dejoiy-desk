<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import NavigationMenu from '#desktop/components/NavigationMenu/NavigationMenu.vue'

import {
  personalSettingCategories,
  personalSettingItems,
} from '../views/PersonalSetting/plugins/index.ts'
</script>

<template>
  <NavigationMenu :categories="personalSettingCategories" :entries="personalSettingItems" />
</template>
