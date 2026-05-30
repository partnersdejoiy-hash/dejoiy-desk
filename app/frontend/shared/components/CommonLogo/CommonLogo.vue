<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import DejoiyBrand from '#shared/components/DejoiyBrand/DejoiyBrand.vue'
import { useLogoUrl } from '#shared/composables/useLogoUrl.ts'
import { useApplicationStore } from '#shared/stores/application.ts'

export interface Props {
  /** Use official DEJOIY lockup instead of uploaded product logo when on default branding. */
  preferBrandLockup?: boolean
  brandVariant?: 'icon' | 'wordmark' | 'stacked' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  preferBrandLockup: true,
  brandVariant: 'stacked',
})

const { logoUrl } = useLogoUrl()
const application = useApplicationStore()

const useOfficialBrand = computed(() => {
  if (!props.preferBrandLockup) return false
  const logo = application.config.product_logo
  return !logo || logo === 'logo.svg'
})
</script>

<template>
  <DejoiyBrand v-if="useOfficialBrand" :variant="brandVariant" />
  <img v-else class="max-h-32 max-w-[14rem]" :src="logoUrl" :alt="$c.product_name" />
</template>
