// Copyright (C) 2024-2026 Dejoiy

import {
  NotificationTypes,
  useNotifications,
} from '#shared/components/CommonNotifications/index.ts'
import UserError from '#shared/errors/UserError.ts'

import type { ApolloError } from '@apollo/client/core'

export const handleUserErrors = (error: UserError | ApolloError) => {
  if (error instanceof UserError) {
    useNotifications().notify({
      id: error.userErrorId,
      message: error.getFirstErrorMessage(),
      type: NotificationTypes.Error,
    })
  }
}
