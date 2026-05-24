// Copyright (C) 2024-2026 Dejoiy

import { useNow } from '@vueuse/core'

const reactiveNow = useNow({
  interval: 1000,
})

export const useReactiveNow = () => reactiveNow
