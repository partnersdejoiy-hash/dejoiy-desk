<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import TwoFactorConfigurationWizard from '#desktop/components/TwoFactor/TwoFactorConfigurationWizard.vue'

defineProps<{
  data?: { token?: string }
}>()

const emit = defineEmits<{
  redirect: [url: string]
}>()

const redirect = (url: string) => {
  emit('redirect', url)
}
</script>

<template>
  <TwoFactorConfigurationWizard :token="data?.token" @redirect="redirect" />
</template>
