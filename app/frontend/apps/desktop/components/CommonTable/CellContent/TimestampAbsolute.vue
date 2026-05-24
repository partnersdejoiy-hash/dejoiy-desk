<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { CellContentProps } from '../types.ts'

const props = defineProps<CellContentProps>()
</script>

<template>
  <CommonDateTime
    v-if="props.value"
    class="group-focus-visible:text-white"
    :class="{
      'text-black dark:text-white': isRowSelected,
    }"
    :date-time="props.value as string"
    type="absolute"
  />
</template>
