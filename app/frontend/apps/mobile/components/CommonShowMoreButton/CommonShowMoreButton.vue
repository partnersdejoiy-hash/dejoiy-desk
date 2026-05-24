<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
interface Props {
  entities: unknown[]
  totalCount: number
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <button
    v-if="entities.length < totalCount"
    class="flex min-h-13.5 items-center justify-center gap-2"
    :class="{
      'cursor-default text-gray-100/50': disabled,
      'text-blue': !disabled,
    }"
    type="button"
    :disabled="disabled"
  >
    {{ $t('Show %s more', totalCount - entities.length) }}
  </button>
</template>
