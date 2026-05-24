<!-- Copyright (C) 2024-2026 Dejoiy -->
<script lang="ts" setup>
interface Props {
  title: string
  text?: string
  icon?: string
  withIllustration?: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <img
      v-if="withIllustration"
      class="mx-auto max-h-99 w-152"
      src="./assets/confetti.svg"
      alt="confetti"
    />
    <CommonLabel
      tag="h2"
      size="xl"
      class="flex items-center justify-center gap-2 text-black dark:text-white"
    >
      <!--   prefix-icon prop can not be used without changing the size regarding the icon   -->
      <CommonIcon v-if="icon" size="small" :name="icon" />
      <span>
        {{ title }}
      </span>
    </CommonLabel>

    <slot>
      <CommonLabel tag="p" class="block! py-5">
        {{ text }}
      </CommonLabel>
    </slot>
  </div>
</template>
