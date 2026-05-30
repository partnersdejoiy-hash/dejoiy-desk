// Copyright (C) 2024-2026 Dejoiy

import { EnumSystemImportSource } from '#shared/graphql/types.ts'

import GuidedSetupImportSourceKayako from '../GuidedSetupImportSourceKayako.vue'

import type { GuidedSetupImportSourcePlugin } from './index.ts'

export default <GuidedSetupImportSourcePlugin>{
  source: EnumSystemImportSource.Kayako,
  label: __('Kayako'),
  beta: true,
  component: GuidedSetupImportSourceKayako,
  importEntities: {
    Groups: __('Groups'),
    Organizations: __('Organizations'),
    Users: __('Users'),
    Tickets: __('Tickets'),
  },
  documentationURL: '/help',
}
