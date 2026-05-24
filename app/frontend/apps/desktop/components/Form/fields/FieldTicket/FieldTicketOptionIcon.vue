<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonTicketStateIndicatorIcon from '#desktop/components/CommonTicketStateIndicator/CommonTicketStateIndicatorIcon.vue'

import type { AutoCompleteTicketOption } from './types'

defineProps<{
  option: AutoCompleteTicketOption
}>()
</script>

<template>
  <CommonTicketStateIndicatorIcon
    class="ltr:mr-1.5 rtl:ml-1.5"
    :color-code="option.ticket.stateColorCode"
    :label="option.ticket.state.name"
  />
</template>
