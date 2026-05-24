// Copyright (C) 2024-2026 Dejoiy

import { useApplicationStore } from '#shared/stores/application.ts'

export const emailBeforeRouteEnterGuard = () => {
  const application = useApplicationStore()

  if (application.config.system_online_service) {
    return '/guided-setup/manual/channels/email-pre-configured'
  }

  return true
}
