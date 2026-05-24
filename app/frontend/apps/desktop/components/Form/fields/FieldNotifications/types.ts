// Copyright (C) 2024-2026 Dejoiy

export enum NotificationMatrixRowKey {
  Create = 'create',
  Escalation = 'escalation',
  ReminderReached = 'reminderReached',
  Update = 'update',
}

export enum NotificationMatrixPathKey {
  Criteria = 'criteria',
  Channel = 'channel',
}

export enum NotificationMatrixColumnKey {
  MyTickets = 'ownedByMe',
  NotAssigned = 'ownedByNobody',
  SubscribedTickets = 'subscribed',
  AllTickets = 'no',
  AlsoNotifyViaEmail = 'email',
}

export type NotificationMatrix = {
  [rowKey in NotificationMatrixRowKey]: {
    [pathKey in NotificationMatrixPathKey]: {
      [columnKey in NotificationMatrixColumnKey]: boolean
    }
  }
}
