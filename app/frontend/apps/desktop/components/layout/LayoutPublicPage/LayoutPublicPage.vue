<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import CommonLogo from '#shared/components/CommonLogo/CommonLogo.vue'

import LayoutPublicPageBoxActions from './LayoutPublicPageBoxActions.vue'

import type { BoxSizes } from '../types'

export interface Props {
  title?: string
  showLogo?: boolean
  boxSize?: BoxSizes
  hideFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  boxSize: 'medium',
})

const boxSizeMap: Record<BoxSizes, string> = {
  small: 'max-w-md',
  medium: 'max-w-lg',
  large: 'max-w-2xl',
}

const boxSizeClass = computed(() => {
  return boxSizeMap[props.boxSize]
})


</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center text-stone-200"
    style="background: linear-gradient(135deg, #1a0533 0%, #0f1547 50%, #050d24 100%)"
  >
    <div class="dejoiy-brand-bar" role="presentation" />

    <div :class="boxSizeClass" class="m-auto w-full px-4">
      <main
        class="dejoiy-card-elevated flex flex-col gap-2.5 bg-white p-6 text-black"
      >
        <div v-if="showLogo" class="flex justify-center pb-2">
          <CommonLogo />
        </div>
        <h1 v-if="title" class="mb-5 text-center text-xl font-semibold text-gray-800">
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
        class="flex w-full flex-col items-center justify-center space-y-3 py-3 align-middle text-xs"
      >
        <slot name="bottomContent" />
      </section>
      <footer
        v-if="!hideFooter"
        class="flex w-full items-center justify-center py-4 align-middle text-xs text-purple-300/60"
      >
        <span class="ltr:mr-1 rtl:ml-1">{{ $t('Powered by') }}</span>
        <CommonLink
          link="https://dejoiy.com"
          open-in-new-tab
          external
          class="font-medium text-purple-300/80 hover:text-purple-200!"
        >
          {{ $t('Dejoiy') }}
        </CommonLink>
      </footer>
    </div>
  </div>
</template>
