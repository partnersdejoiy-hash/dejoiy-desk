// Copyright (C) 2024-2026 Dejoiy

export type BadgeSize = 'xs' | 'small' | 'medium' | 'large' | 'xl'

export type BadgeVariant =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'tertiary'
  | 'highlight'
  | 'custom'

export type BadgeClass = BadgeVariant | 'base'
export type BadgeClassMap = Record<BadgeClass, string>
