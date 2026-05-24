// Copyright (C) 2024-2026 Dejoiy

import type { ClientWebsocketContext } from '#shared/types/server/apollo/client.ts'

import type { Operation } from '@apollo/client/core'

export default function getBatchContext(operation: Operation): ClientWebsocketContext {
  const defaultWebsocketContext: ClientWebsocketContext = {
    active: false,
  }
  const context = operation.getContext()
  const websocket: Partial<ClientWebsocketContext> = context.websocket || {}

  return Object.assign(defaultWebsocketContext, websocket)
}
