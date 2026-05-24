// Copyright (C) 2024-2026 Dejoiy

export interface CollapseOptions {
  storageKey?: string
  name?: string
}

export interface CollapseEmit {
  (event: 'collapse', arg: boolean): void
  (event: 'expand', arg: boolean): void
}
