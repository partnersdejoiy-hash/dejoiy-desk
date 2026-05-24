// Copyright (C) 2024-2026 Dejoiy

import { isRef } from 'vue'

import { useTabGroup } from '#desktop/components/CommonTabGroup/useTabGroup.ts'

describe('useTabGroup', () => {
  it('test useTabGroup', () => {
    const composable = useTabGroup()
    expect(isRef(composable.activeTab)).toBeTruthy()
  })
})
