<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { useApplicationStore } from '#shared/stores/application.ts'

const application = useApplicationStore()
</script>

<template>
  <footer
    class="text-gray mt-8 flex w-full max-w-md items-center justify-center border-t border-gray-600 py-2.5 align-middle leading-4 font-medium"
  >
    <span class="ltr:mr-1 rtl:ml-1">{{ $t('Powered by') }}</span>
    <CommonLink link="https://dejoiy.com" external open-in-new-tab class="font-medium">
      {{ $t('Dejoiy') }}
    </CommonLink>
  </footer>
</template>
