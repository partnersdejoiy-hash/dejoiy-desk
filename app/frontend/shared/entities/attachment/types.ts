// Copyright (C) 2024-2026 Dejoiy

import type { StoredFile } from '#shared/graphql/types.ts'

import type { Except } from 'type-fest'

export type Attachment = Except<StoredFile, '__typename' | 'id' | 'createdAt' | 'updatedAt'>
