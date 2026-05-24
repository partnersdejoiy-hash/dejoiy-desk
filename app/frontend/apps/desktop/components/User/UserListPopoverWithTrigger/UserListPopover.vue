<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { TicketLiveAppUser } from '#shared/entities/ticket/types.ts'
import type { User } from '#shared/graphql/types.ts'

import UserInfo from '#desktop/components/User/UserInfo.vue'

interface Props {
  users: User[]
  liveUsers?: Pick<TicketLiveAppUser, 'editing' | 'app' | 'isIdle'>[]
}

defineProps<Props>()
</script>

<template>
  <section ref="popover-section" data-type="popover" class="flex flex-col gap-2.5 p-3">
    <UserInfo
      v-for="(user, index) in users"
      :key="user.id"
      :user="user"
      :live="liveUsers?.[index]"
      size="small"
      dense
    />
  </section>
</template>
