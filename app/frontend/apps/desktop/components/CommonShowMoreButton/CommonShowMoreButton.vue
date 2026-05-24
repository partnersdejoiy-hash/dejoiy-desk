<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonButton from '#desktop/components/CommonButton/CommonButton.vue'

interface Props {
  entities: unknown[]
  totalCount: number
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <CommonButton v-if="entities.length < totalCount" type="button" :disabled="disabled">
    {{ $t('Show more') }}
  </CommonButton>
</template>
