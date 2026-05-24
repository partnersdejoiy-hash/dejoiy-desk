<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { useTicketCreateView } from '#shared/entities/ticket/composables/useTicketCreateView.ts'

const { ticketCreateEnabled } = useTicketCreateView()
</script>

<template>
  <div v-if="ticketCreateEnabled" class="flex cursor-pointer items-center justify-end">
    <CommonLink link="/tickets/create" :aria-label="$t('Create new ticket')">
      <CommonIcon name="add" size="small" decorative />
    </CommonLink>
  </div>
</template>
