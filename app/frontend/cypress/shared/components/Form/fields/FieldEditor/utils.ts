// Copyright (C) 2024-2026 Dejoiy

import { FormKit } from '@formkit/vue'

import { mountComponent } from '#cy/utils.ts'

import Form from '#shared/components/Form/Form.vue'

export const mountEditor = (
  props: Record<string, unknown> = {},
  permissions?: string[],
  config?: Record<string, unknown>,
) => {
  return mountComponent(FormKit, {
    props: {
      id: 'editor',
      name: 'editor',
      type: 'editor',
      ...props,
    },
    permissions,
    config,
  })
}

export const mountEditorWithAttachments = (permissions?: string[]) => {
  const props = {
    schema: [
      {
        isLayout: true,
        component: 'FormGroup',
        children: [
          {
            name: 'editor',
            type: 'editor',
            props: {
              meta: {
                mentionKnowledgeBase: {
                  attachmentsNodeName: 'attachments',
                },
              },
            },
          },
          {
            name: 'attachments',
            type: 'file',
            props: {
              multiple: true,
            },
          },
        ],
      },
    ],
  }

  return mountComponent(Form, {
    props,
    attrs: {
      class: 'form',
    },
    permissions,
  })
}
