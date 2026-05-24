// Copyright (C) 2024-2026 Dejoiy

import { isEmpty } from 'lodash-es'

import type { User } from '#shared/graphql/types.ts'

export const userDisplayName = (user: Partial<User>): string => {
  const { fullname, email, phone, login } = user

  return [fullname, email, phone, login].find((elem) => elem && !isEmpty(elem)) || '-'
}
