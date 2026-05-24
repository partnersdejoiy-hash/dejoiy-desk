// Copyright (C) 2024-2026 Dejoiy

import type { UseElementBoundingReturn } from '@vueuse/core'
import type { Ref } from 'vue'

export interface FieldTreeSelectInputDropdownInstance {
  openDropdown(bounds: UseElementBoundingReturn, height: Ref<number>): void
  closeDropdown(): void
  getFocusableOptions(): HTMLElement[]
  moveFocusToDropdown(lastOption: boolean): void
  isOpen: boolean
}

export interface FieldTreeSelectInputDropdownInternalInstance extends Omit<
  FieldTreeSelectInputDropdownInstance,
  'isOpen'
> {
  isOpen: Ref<boolean>
}
