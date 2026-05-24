<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonLoader from '#desktop/components/CommonLoader/CommonLoader.vue'

interface Props {
  message?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mt-1 text-center">
    <CommonLabel v-if="message">
      {{ $t(message) }}
    </CommonLabel>
    <CommonLoader class="mt-5 mb-3" loading />
  </div>
</template>
