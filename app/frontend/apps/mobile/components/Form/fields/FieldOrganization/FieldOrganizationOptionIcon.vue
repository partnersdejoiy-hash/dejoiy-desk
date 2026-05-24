<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonOrganizationAvatar from '#shared/components/CommonOrganizationAvatar/CommonOrganizationAvatar.vue'
import type { AutoCompleteOrganizationOption } from '#shared/components/Form/fields/FieldOrganization/types.ts'

defineProps<{
  option: AutoCompleteOrganizationOption
}>()
</script>

<template>
  <CommonOrganizationAvatar
    v-if="option.organization"
    :entity="option.organization"
    :class="{
      'opacity-30': option.disabled,
    }"
    size="small"
    class="ltr:mr-4 rtl:ml-4"
  />
</template>
