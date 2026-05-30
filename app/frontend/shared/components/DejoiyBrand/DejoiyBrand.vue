<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import { DEJOIY_BRAND } from '#shared/constants/branding.ts'

import dejoiyIcon from './assets/dejoiy-icon.svg'
import dejoiyWordmark from './assets/dejoiy-wordmark.svg'

export type DejoiyBrandVariant = 'icon' | 'wordmark' | 'stacked' | 'full'

export interface Props {
  /** icon = app mark only; wordmark = text lockup; stacked = icon over wordmark; full = stacked + tagline emphasis */
  variant?: DejoiyBrandVariant
  iconClass?: string
  wordmarkClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'stacked',
  iconClass: 'h-14 w-14',
  wordmarkClass: 'h-10 w-auto max-w-[220px]',
})

const showIcon = computed(() => ['icon', 'stacked', 'full'].includes(props.variant))
const showWordmark = computed(() => ['wordmark', 'stacked', 'full'].includes(props.variant))
const showTagline = computed(() => props.variant === 'full')
</script>

<template>
  <div
    class="dejoiy-brand flex flex-col items-center gap-2"
    :class="{ 'dejoiy-brand--full': variant === 'full' }"
  >
    <img
      v-if="showIcon"
      :src="dejoiyIcon"
      :alt="DEJOIY_BRAND.name"
      class="dejoiy-brand__icon shrink-0"
      :class="iconClass"
    />
    <img
      v-if="showWordmark"
      :src="dejoiyWordmark"
      :alt="`${DEJOIY_BRAND.name} ${DEJOIY_BRAND.tagline}`"
      class="dejoiy-brand__wordmark"
      :class="wordmarkClass"
    />
    <p
      v-if="showTagline"
      class="dejoiy-brand__tagline m-0 text-center text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
    >
      <span class="text-[#001F3F] dark:text-slate-200">YOU </span>
      <span class="text-[#E91E63]">+ </span>
      <span class="text-[#E91E63]">JOY</span>
    </p>
  </div>
</template>
