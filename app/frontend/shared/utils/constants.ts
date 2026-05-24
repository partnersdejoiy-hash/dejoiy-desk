// Copyright (C) 2024-2026 Dejoiy

import { convertToGraphQLId } from '#shared/graphql/utils.ts'

export const SYSTEM_USER_INTERNAL_ID = 1
export const SYSTEM_USER_ID = convertToGraphQLId('User', SYSTEM_USER_INTERNAL_ID)
