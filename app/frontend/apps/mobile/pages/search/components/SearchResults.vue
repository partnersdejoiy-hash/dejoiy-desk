<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { computed } from 'vue'

import { replaceTags } from '#shared/utils/formatter.ts'

import { useSearchPlugins } from '../plugins/index.ts'

interface Props {
  type: string
  data: Record<string, unknown>[]
}

const props = defineProps<Props>()

const searchPlugins = useSearchPlugins()

const plugin = computed(() => searchPlugins[props.type])
</script>

<template>
  <template v-for="item in data" :key="item.id as string">
    <CommonLink :link="replaceTags(plugin.link, item, true)">
      <component :is="plugin.component" :entity="item" />
    </CommonLink>
  </template>
</template>
