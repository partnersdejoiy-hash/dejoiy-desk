<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { useLogoUrl } from '#shared/composables/useLogoUrl.ts'

const { logoUrl } = useLogoUrl()
</script>

<template>
  <img class="max-h-32 max-w-[14rem]" :src="logoUrl" :alt="$c.product_name" />
</template>
