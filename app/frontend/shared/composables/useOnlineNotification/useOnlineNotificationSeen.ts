// Copyright (C) 2024-2026 Dejoiy

import { watch } from 'vue'

import { useOnlineNotificationSeenMutation } from '#shared/entities/online-notification/graphql/mutations/seen.api.ts'
import { MutationHandler } from '#shared/server/apollo/handler/index.ts'
import type { ObjectWithId } from '#shared/types/utils.ts'

import type { Ref } from 'vue'

export const useOnlineNotificationSeen = (object: Ref<ObjectWithId | undefined>) => {
  const seenMutation = new MutationHandler(useOnlineNotificationSeenMutation())

  const setAsSeen = async () => {
    if (!object.value?.id) return

    await seenMutation.send({ objectId: object.value.id })
  }

  watch(() => object.value?.id, setAsSeen)
}
