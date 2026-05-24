<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
interface Props {
  date: string
}

defineProps<Props>()
</script>

<template>
  <div class="text-gray text-center">
    <CommonDateTime :date-time="date" type="absolute" absolute-format="date" />
  </div>
</template>
