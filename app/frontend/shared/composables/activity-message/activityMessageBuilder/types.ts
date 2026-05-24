// Copyright (C) 2024-2026 Dejoiy

import type { ActivityMessageMetaObject } from '#shared/graphql/types.ts'

export interface ActivityMessageBuilder {
  model: string
  path: (metaObject: ActivityMessageMetaObject) => string | undefined
  messageText: (
    type: string,
    authorName: string,
    metaObject?: Maybe<ActivityMessageMetaObject>,
  ) => string
}
