// Copyright (C) 2024-2026 Dejoiy

import type { Ref } from 'vue'

export interface CommonSelectInstance {
  openDialog(): void
  closeDialog(): void
  getFocusableOptions(): HTMLElement[]
  isOpen: boolean
}

export interface CommonSelectInternalInstance extends Omit<CommonSelectInstance, 'isOpen'> {
  isOpen: Ref<boolean>
}
