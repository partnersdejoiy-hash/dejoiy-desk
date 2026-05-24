// Copyright (C) 2024-2026 Dejoiy

import type { Component } from 'vue'

let buttonGroup: Component | null = null

export const initButtonGroup = (cmp: Component) => {
  buttonGroup = cmp
}

export const getButtonGroup = () => buttonGroup
