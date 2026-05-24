// Copyright (C) 2024-2026 Dejoiy

import type { EmailOutboundData } from './email-inbound-outbound.ts'

export type EmailNotificationData = EmailOutboundData & {
  notification_sender: string
}
