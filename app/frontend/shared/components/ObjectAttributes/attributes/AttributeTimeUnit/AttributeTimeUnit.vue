<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { ObjectAttributeTimeUnit } from './attributeTimeUnitTypes.ts'
import type { ObjectAttributeProps } from '../../types.ts'

defineProps<ObjectAttributeProps<ObjectAttributeTimeUnit, number>>()
</script>

<template>{{ value?.toFixed(2) }}</template>
