<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { CellContentProps } from '../types.ts'

const props = defineProps<CellContentProps>()
</script>

<template>
  {{ props.value }}
</template>
