<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import { i18n } from '#shared/i18n/index.ts'

import CommonAlert from '#shared/components/CommonAlert/CommonAlert.vue'

/**
 * OTRS migration plugins are distributed internally by DEJOIY operations.
 * Vendor-hosted download URLs are intentionally not linked from this UI.
 */
const helpText = computed(() =>
  i18n.t(
    'Contact your DEJOIY administrator for OTRS migration packages. Plugins are not downloaded from external vendor hosts.',
  ),
)
</script>

<template>
  <CommonAlert variant="info">
    {{ helpText }}
  </CommonAlert>
</template>
