// Copyright (C) 2024-2026 Dejoiy

import type { EnumAfterAuthType } from '#shared/graphql/types.ts'

import type { Component } from 'vue'

export interface AfterAuthPlugin {
  name: EnumAfterAuthType
  title: string
  component: Component
}
