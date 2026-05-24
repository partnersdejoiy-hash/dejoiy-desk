// Copyright (C) 2024-2026 Dejoiy

import type { Component } from 'vue'

export interface PushComponentData {
  name: string
  id: string
  cmp: Component
  props: Record<string, unknown>
}

export interface DestroyComponentData {
  name: string
  id?: string
}
