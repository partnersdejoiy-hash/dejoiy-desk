<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import CommonLogo from '#shared/components/CommonLogo/CommonLogo.vue'
import { DEJOIY_CANVAS } from '#shared/constants/branding.ts'

import LayoutPublicPageBoxActions from './LayoutPublicPageBoxActions.vue'

import type { BoxSizes } from '../types'

export interface Props {
  title?: string
  showLogo?: boolean
  boxSize?: BoxSizes
  hideFooter?: boolean
  /** auth = dark mesh; hero = light marketing canvas */
  canvas?: 'auth' | 'hero'
}

const props = withDefaults(defineProps<Props>(), {
  boxSize: 'medium',
  canvas: 'auth',
})

const boxSizeMap: Record<BoxSizes, string> = {
  small: 'max-w-md',
  medium: 'max-w-lg',
  large: 'max-w-2xl',
}

const boxSizeClass = computed(() => boxSizeMap[props.boxSize])

const canvasClass = computed(() =>
  props.canvas === 'hero' ? DEJOIY_CANVAS.hero : `${DEJOIY_CANVAS.auth} ${DEJOIY_CANVAS.mesh}`,
)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center" :class="canvasClass">
    <div class="dejoiy-brand-bar" role="presentation" />

    <div :class="boxSizeClass" class="relative z-10 m-auto w-full px-4">
      <main class="dejoiy-glass-card flex flex-col gap-3 p-6 text-[var(--dejoiy-navy)] dark:text-slate-100">
        <div v-if="showLogo" class="flex justify-center pb-1">
          <CommonLogo brand-variant="full" />
        </div>
        <h1
          v-if="title"
          class="mb-4 text-center text-xl font-semibold text-[var(--dejoiy-navy)] dark:text-white"
        >
          {{ $t(title) }}
        </h1>
        <slot />

        <LayoutPublicPageBoxActions v-if="$slots.boxActions">
          <slot name="boxActions" />
        </LayoutPublicPageBoxActions>
      </main>

      <section
        v-if="$slots.bottomContent"
        :aria-label="$t('Additional information and links')"
        class="flex w-full flex-col items-center justify-center space-y-3 py-3 align-middle text-xs text-cyan-100/80"
      >
        <slot name="bottomContent" />
      </section>
      <footer
        v-if="!hideFooter"
        class="flex w-full items-center justify-center py-4 align-middle text-xs text-cyan-200/60"
      >
        <span class="ltr:mr-1 rtl:ml-1">{{ $t('Powered by') }}</span>
        <CommonLink
          link="https://dejoiy.com"
          open-in-new-tab
          external
          class="font-medium text-[var(--dejoiy-magenta)] hover:text-[var(--dejoiy-cyan)]!"
        >
          {{ $t('Dejoiy') }}
        </CommonLink>
      </footer>
    </div>
  </div>
</template>
