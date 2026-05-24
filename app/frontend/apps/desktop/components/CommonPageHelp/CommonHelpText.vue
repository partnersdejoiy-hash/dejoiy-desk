<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
interface Props {
  helpText?: string | string[]
}

defineProps<Props>()
</script>

<template>
  <div class="ltr:text-left rtl:text-right">
    <template v-if="Array.isArray(helpText)">
      <CommonLabel v-for="(text, index) in helpText" :key="`${text}-${index}`" tag="p">{{
        text
      }}</CommonLabel>
    </template>
    <CommonLabel v-else tag="p">{{ helpText }}</CommonLabel>
  </div>
</template>
