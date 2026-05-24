<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonOrganizationAvatar from '#shared/components/CommonOrganizationAvatar/CommonOrganizationAvatar.vue'
import CommonUserAvatar from '#shared/components/CommonUserAvatar/CommonUserAvatar.vue'
import type { AutoCompleteCustomerGenericOption } from '#shared/components/Form/fields/FieldCustomer/types.ts'

defineProps<{
  option: AutoCompleteCustomerGenericOption
}>()
</script>

<template>
  <CommonUserAvatar
    v-if="option.object?.__typename === 'User'"
    :entity="option.object"
    size="xs"
    no-indicator
  />
  <CommonOrganizationAvatar
    v-else-if="option.object?.__typename === 'Organization'"
    :entity="option.object"
    size="xs"
  />
</template>
