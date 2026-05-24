<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonDialog from '#desktop/components/CommonDialog/CommonDialog.vue'
</script>

<template>
  <CommonDialog
    name="connection-lost"
    :header-title="__('Lost network connection')"
    wrapper-tag="article"
    hide-footer
    no-close
    global
    fullscreen
  >
    <div class="flex justify-center">
      <CommonIcon
        name="wifi-off"
        size="medium"
        class="text-stone-200 dark:text-neutral-500"
        animation="pulse"
      />
    </div>
    <CommonLabel size="large">{{ $t('Trying to reconnect…') }}</CommonLabel>
  </CommonDialog>
</template>
