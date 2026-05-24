<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const intersecting = defineModel<boolean>({
  required: false,
  default: false,
})

useIntersectionObserver(
  useTemplateRef('indicator'),
  ([{ isIntersecting }]) => {
    intersecting.value = isIntersecting
  },
  {
    threshold: 0.1,
  },
)
</script>

<template>
  <div ref="indicator">
    <slot />
  </div>
</template>
