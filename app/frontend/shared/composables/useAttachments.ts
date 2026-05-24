// Copyright (C) 2024-2026 Dejoiy

import { computed, type ComputedRef, type Ref } from 'vue'

import { getAttachmentLinks } from '#shared/composables/getAttachmentLinks.ts'
import type { Attachment } from '#shared/entities/attachment/types.ts'
import { useApplicationStore } from '#shared/stores/application.ts'

interface AttachmentsOptions {
  attachments: ComputedRef<Attachment[]> | Ref<Attachment[]>
}

export interface AttachmentWithUrls extends Attachment {
  preview: string
  inline: string
  canDownload: boolean
  downloadUrl: string
}

export const useAttachments = (options: AttachmentsOptions) => {
  const application = useApplicationStore()

  const attachments = computed<AttachmentWithUrls[]>(() => {
    return options.attachments.value.map((attachment) => {
      const { previewUrl, inlineUrl, canDownload, downloadUrl } = getAttachmentLinks(
        {
          internalId: attachment.internalId,
          type: attachment.type,
        },
        application.config.api_path,
      )

      return {
        ...attachment,
        preview: previewUrl,
        inline: inlineUrl,
        canDownload,
        downloadUrl,
      }
    })
  })

  return {
    attachments,
  }
}
