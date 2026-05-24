<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { textToHtml } from '#shared/utils/helpers.ts'

import type { ObjectAttributeTextarea } from './attributeTextareaTypes.ts'
import type { ObjectAttributeProps } from '../../types.ts'

defineProps<ObjectAttributeProps<ObjectAttributeTextarea, string>>()
</script>

<template>
  <!--      eslint-disable vue/no-v-html -->
  <div v-if="mode === 'view'" v-html="textToHtml(value)" />
  <template v-else>{{ value }}</template>
</template>
