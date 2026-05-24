<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import { ref } from 'vue'

import { useArticleSeen } from '../../composable/useArticleSeen.ts'

import ArticleReactionBadge from './ArticleReactionBadge.vue'

interface Props {
  subject?: Maybe<string>
  to?: Maybe<string>
  reaction?: Maybe<string>
}

defineProps<Props>()

const emit = defineEmits<{
  seen: []
}>()

const articleElement = ref<HTMLDivElement>()

useArticleSeen(articleElement, emit)
</script>

<template>
  <div ref="articleElement" class="text-gray flex items-center gap-2">
    <div class="grow text-center">"{{ subject }}" -&gt; "{{ to }}"</div>
    <ArticleReactionBadge
      v-if="reaction"
      class="bg-blue w-7 border border-black text-black"
      :reaction="reaction"
    />
  </div>
</template>
