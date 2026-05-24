// Copyright (C) 2024-2026 Dejoiy

import type { Component } from 'vue'

export interface TooltipVisualConfig {
  type: 'popup' | 'inline'
  component: Component
}

export interface TooltipItemDescriptor {
  label: string
  type: 'button' | 'link' | 'text'
  link?: string
}
