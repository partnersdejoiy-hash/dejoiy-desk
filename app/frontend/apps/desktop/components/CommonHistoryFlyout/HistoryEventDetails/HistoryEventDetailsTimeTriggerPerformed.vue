<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { EventActionOutput } from '../types.ts'

interface Props {
  event: EventActionOutput
}

const { event } = defineProps<Props>()
</script>

<template>
  <span>
    <CommonLabel v-if="event.description" class="text-gray-100 dark:text-neutral-400">{{
      $t(event.description)
    }}</CommonLabel>
  </span>
</template>
