// Copyright (C) 2024-2026 Dejoiy

import { inject } from 'vue'

import type { FormKitConfig } from '@formkit/core'

const useFormKitConfig = () => {
  return inject(Symbol.for('FormKitConfig')) as FormKitConfig
}

export default useFormKitConfig
