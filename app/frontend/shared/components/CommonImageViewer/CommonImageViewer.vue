<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
import { imageViewerOptions } from '#shared/composables/useImageViewer.ts'
</script>

<template>
  <VueEasyLightbox
    data-test-id="imageViewer"
    :imgs="imageViewerOptions.images"
    :index="imageViewerOptions.index"
    :visible="imageViewerOptions.visible"
    @hide="imageViewerOptions.visible = false"
  />
</template>
