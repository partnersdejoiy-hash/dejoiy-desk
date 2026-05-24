// Copyright (C) 2024-2026 Dejoiy

import { EnumSystemImportSource } from '#shared/graphql/types.ts'

import GuidedSetupImportSourceOTRS from '../GuidedSetupImportSourceOTRS.vue'

import type { GuidedSetupImportSourcePlugin } from './index.ts'

export default <GuidedSetupImportSourcePlugin>{
  source: EnumSystemImportSource.Otrs,
  label: __('OTRS'),
  beta: true,
  component: GuidedSetupImportSourceOTRS,
  importEntities: {
    Configuration: __('Configuration'),
    Base: __('Base Objects'),
    User: __('Users'),
    Ticket: __('Tickets'),
  },
  preStartHints: [
    __(
      "OTRS BPM processes can't get imported into Dejoiy since it currently doesn't support this kind of workflows.",
    ),
    __(
      'Dynamic fields are not that common in Dejoiy, as it takes a different approach to ticket attributes. Dejoiy also uses tags in addition to custom fields to classify tickets. This difference can create a new philosophy of your ticket attributes/tags compared to your current use of dynamic fields in OTRS.',
    ),
  ],
  documentationURL: 'https://docs.zammad.org/en/latest/migration/otrs.html',
}
