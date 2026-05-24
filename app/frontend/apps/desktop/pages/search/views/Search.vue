<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { EnumSearchableModels } from '#shared/graphql/types.ts'

import LayoutTaskbarTabContent from '#desktop/components/layout/LayoutTaskbarTabContent.vue'
import SearchContent from '#desktop/pages/search/components/SearchContent.vue'

defineProps<{
  searchTerm: string
}>()

defineOptions({
  beforeRouteEnter(to) {
    return to.query.entity ? true : { ...to, query: { entity: EnumSearchableModels.Ticket } }
  },
  beforeRouteUpdate(to) {
    return to.query.entity ? true : { ...to, query: { entity: EnumSearchableModels.Ticket } }
  },
})
</script>

<template>
  <LayoutTaskbarTabContent>
    <SearchContent :search-term="searchTerm" />
  </LayoutTaskbarTabContent>
</template>
