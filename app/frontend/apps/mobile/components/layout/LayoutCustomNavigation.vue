<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

import { useCustomLayout } from './useCustomLayout.ts'

const { setCustomLayout } = useCustomLayout()

onMounted(() => {
  setCustomLayout(true)
})

onBeforeUnmount(() => {
  setCustomLayout(false)
})
</script>

<template>
  <teleport to="[data-bottom-navigation]">
    <slot />
  </teleport>
</template>
