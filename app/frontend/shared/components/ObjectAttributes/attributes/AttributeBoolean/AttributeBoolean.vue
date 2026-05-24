<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import type { ObjectAttributeBoolean } from './attributeBooleanTypes.ts'
import type { ObjectAttributeProps } from '../../types.ts'

const props = defineProps<ObjectAttributeProps<ObjectAttributeBoolean, boolean>>()

const body = computed(() => {
  const { true: yes, false: no } = props.attribute.dataOption?.options || {}
  return props.value ? yes || __('yes') : no || __('no')
})

const translate = computed(() => {
  const { translate = true } = props.attribute.dataOption || {}
  return translate
})
</script>

<template>
  {{ translate ? $t(body) : body }}
</template>
