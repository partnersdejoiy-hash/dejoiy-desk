// Copyright (C) 2024-2026 Dejoiy

import type { Component } from 'vue'

export interface FilePreviewClassMap {
  base: string
  wrapper: string
  preview: string
  link: string
  icon: string
  size: string
}

export interface FilePreviewVisualConfig {
  buttonComponent: Component
  buttonProps?: Record<string, unknown>
}
