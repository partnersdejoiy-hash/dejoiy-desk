// Copyright (C) 2024-2026 Dejoiy

import { useDialog } from '#desktop/components/CommonDialog/useDialog.ts'

export enum EnumFeedbackDialog {
  Generic = 'beta-ui-generic-feedback',
  SwitchBack = 'beta-ui-switch-back-feedback',
}

export const useFeedbackDialog = (name = EnumFeedbackDialog.Generic) => {
  const { open } = useDialog({
    name,
    global: true,
    component: () =>
      name === EnumFeedbackDialog.Generic
        ? import('../FeedbackDialog/FeedbackDialog.vue')
        : import('../FeedbackDialog/SwitchBackFeedbackDialog.vue'),
  })

  return { openFeedbackDialog: open }
}
