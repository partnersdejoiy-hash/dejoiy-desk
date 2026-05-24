<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
interface Props {
  content: string
}

defineProps<Props>()
</script>

<template>
  <CommonAlert id="bottom" variant="warning">
    <p>{{ $t('Delivery failed: "%s"', content) }}</p>
  </CommonAlert>
</template>
