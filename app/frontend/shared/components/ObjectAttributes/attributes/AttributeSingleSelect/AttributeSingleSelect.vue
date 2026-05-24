<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import { translateOption } from '../../utils.ts'

import type { ObjectAttributeSingleSelect } from './attributeSingleSelectTypes.ts'
import type { ObjectAttributeProps } from '../../types.ts'

const props = defineProps<ObjectAttributeProps<ObjectAttributeSingleSelect, string>>()

const body = computed(() => {
  if (props.attribute.dataType === 'tree_select') {
    return props.value
      .split('::')
      .map((field) => translateOption(props.attribute, field))
      .join(' › ')
  }
  const value = props.attribute.dataOption.historical_options?.[props.value] ?? props.value
  return translateOption(props.attribute, value)
})
</script>

<template>
  {{ body }}
</template>
