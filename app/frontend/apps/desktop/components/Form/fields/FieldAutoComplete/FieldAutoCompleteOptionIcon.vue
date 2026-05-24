<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { AutoCompleteOption } from '#shared/components/Form/fields/FieldAutocomplete/types.ts'

defineProps<{
  option: AutoCompleteOption
}>()
</script>

<template>
  <CommonIcon
    v-if="option.icon"
    :name="option.icon"
    :class="{
      'opacity-30': option.disabled,
    }"
  />
</template>
