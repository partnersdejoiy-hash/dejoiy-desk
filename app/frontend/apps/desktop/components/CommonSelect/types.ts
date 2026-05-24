// Copyright (C) 2024-2026 Dejoiy

import type { UseElementBoundingReturn } from '@vueuse/core'
import type { Ref } from 'vue'

export interface CommonSelectInstance {
  openDropdown(bounds: UseElementBoundingReturn, height: Ref<number>): void
  closeDropdown(): void
  getFocusableOptions(): HTMLElement[]
  moveFocusToDropdown(lastOption: boolean): void
  isOpen: boolean
}

export interface CommonSelectInternalInstance extends Omit<CommonSelectInstance, 'isOpen'> {
  isOpen: Ref<boolean>
}

export interface DropdownOptionsAction {
  key: string
  label: string
  icon?: string
  onClick: (focus: boolean) => void
}
