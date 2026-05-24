<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
defineEmits<{
  show: [MouseEvent]
}>()
</script>

<template>
  <button
    :aria-label="$t('Show notifications')"
    class="rounded-full outline-blue-800 focus-visible:outline"
    @click="$emit('show', $event)"
  >
    <slot />
  </button>
</template>
