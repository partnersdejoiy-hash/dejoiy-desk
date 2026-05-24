// Copyright (C) 2024-2026 Dejoiy

import useMetaTitle from '#shared/composables/useMetaTitle.ts'

import type { NavigationHookAfter, RouteLocationNormalized } from 'vue-router'

const headerTitleGuard: NavigationHookAfter = (to: RouteLocationNormalized) => {
  if (to.meta.title) {
    const { setViewTitle } = useMetaTitle()
    setViewTitle(to.meta.title)
  }
}

export default headerTitleGuard
