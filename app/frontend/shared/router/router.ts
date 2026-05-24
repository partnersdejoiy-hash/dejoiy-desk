// Copyright (C) 2024-2026 Dejoiy

import { type Router } from 'vue-router'

let routerInstance: Router

export const setCurrentRouter = (router: Router) => {
  routerInstance = router
}

export const getCurrentRouter = () => routerInstance
