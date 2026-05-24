<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import LayoutTaskbarTabContent from '#desktop/components/layout/LayoutTaskbarTabContent.vue'

import OrganizationDetailViewContent from '../components/OrganizationDetailViewContent.vue'

interface Props {
  internalId: string
}

defineProps<Props>()
</script>

<template>
  <LayoutTaskbarTabContent>
    <OrganizationDetailViewContent :internal-id="internalId" />
  </LayoutTaskbarTabContent>
</template>
