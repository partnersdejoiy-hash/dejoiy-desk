// Copyright (C) 2024-2026 Dejoiy

export type AlertVariant = 'success' | 'info' | 'warning' | 'danger'
export type AlertClass = AlertVariant | 'base' | 'dismissButton'
export type AlertClassMap = Record<AlertClass, string>
