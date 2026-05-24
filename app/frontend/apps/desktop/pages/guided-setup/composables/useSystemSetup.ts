// Copyright (C) 2024-2026 Dejoiy

import { inject } from 'vue'

import type { SystemSetup } from '../types/setup.ts'

export const SYSTEM_SETUP_SYMBOL = Symbol('system-setup')

export const useSystemSetup = () => {
  return inject(SYSTEM_SETUP_SYMBOL) as SystemSetup
}
