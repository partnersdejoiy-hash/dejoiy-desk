<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import CommonDateTime from '#shared/components/CommonDateTime/CommonDateTime.vue'

import type { ObjectAttributeDate } from './attributeDateTypes.ts'
import type { ObjectAttributeProps } from '../../types.ts'

defineProps<ObjectAttributeProps<ObjectAttributeDate, string>>()
</script>

<template>
  <CommonDateTime
    :date-time="value"
    :type="attribute.dataType === 'date' ? 'absolute' : 'configured'"
    :absolute-format="attribute.dataType"
  />
</template>
