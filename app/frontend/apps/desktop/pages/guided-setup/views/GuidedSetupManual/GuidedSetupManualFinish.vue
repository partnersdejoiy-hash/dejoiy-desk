<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared'
import { useRouter } from 'vue-router'

import GuidedSetupStatusMessage from '../../components/GuidedSetupStatusMessage.vue'
import { useSystemSetup } from '../../composables/useSystemSetup.ts'

const { setBoxSize, setHideFooter, setTitle } = useSystemSetup()

setBoxSize?.('medium')
setHideFooter?.(true)

setTitle(__('Setup finished'))

const router = useRouter()

useTimeoutFn(() => {
  router.replace('/') // TODO: Use 'default_router' setting.
}, 3000)
</script>

<template>
  <GuidedSetupStatusMessage :message="__('Starting Dejoiy…')" />
</template>
