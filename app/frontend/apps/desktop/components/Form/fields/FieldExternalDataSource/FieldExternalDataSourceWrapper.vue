<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { toRef } from 'vue'

import type { ExternalDataSourceProps as Props } from '#shared/components/Form/fields/FieldExternalDataSource/types.ts'
import { useFieldExternalDataSourceWrapper } from '#shared/components/Form/fields/FieldExternalDataSource/useFieldExternalDataSourceWrapper.ts'

import FieldAutoCompleteInput from '../FieldAutoComplete/FieldAutoCompleteInput.vue'

const props = defineProps<Props>()

// eslint-disable-next-line vue/no-mutating-props
Object.assign(props.context, useFieldExternalDataSourceWrapper(toRef(props, 'context')))
</script>

<template>
  <FieldAutoCompleteInput :context="context" v-bind="$attrs" />
</template>
