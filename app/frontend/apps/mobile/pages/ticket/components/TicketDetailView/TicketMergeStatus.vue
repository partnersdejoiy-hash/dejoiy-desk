<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { AutocompleteSearchTicketEntry } from '#shared/graphql/types.ts'

import CommonTicketStateIndicator from '#mobile/components/CommonTicketStateIndicator/CommonTicketStateIndicator.vue'

defineProps<{
  option: AutocompleteSearchTicketEntry
}>()
</script>

<template>
  <div class="ltr:pr-3 rtl:pl-3">
    <CommonTicketStateIndicator
      :color-code="option.ticket.stateColorCode"
      :label="option.ticket.state.name"
    />
  </div>
</template>
