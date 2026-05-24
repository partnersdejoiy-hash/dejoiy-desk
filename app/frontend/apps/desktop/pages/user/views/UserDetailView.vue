<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import LayoutTaskbarTabContent from '#desktop/components/layout/LayoutTaskbarTabContent.vue'

import UserDetailViewContent from '../components/UserDetailViewContent.vue'

interface Props {
  internalId: string
}

defineProps<Props>()
</script>

<template>
  <LayoutTaskbarTabContent>
    <UserDetailViewContent :internal-id="internalId" />
  </LayoutTaskbarTabContent>
</template>
