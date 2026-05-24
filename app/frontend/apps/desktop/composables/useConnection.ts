// Copyright (C) 2024-2026 Dejoiy

import { handleConnection } from '#shared/server/connection.ts'

import { useDialog } from '#desktop/components/CommonDialog/useDialog.ts'

export const useConnection = () => {
  const dialog = useDialog({
    name: 'connection-lost',
    global: true,
    prefetch: true,
    component: () => import('#desktop/components/ConnectionLostDialog/ConnectionLostDialog.vue'),
  })

  handleConnection(
    () => dialog.open(),
    () => dialog.close(),
  )
}
