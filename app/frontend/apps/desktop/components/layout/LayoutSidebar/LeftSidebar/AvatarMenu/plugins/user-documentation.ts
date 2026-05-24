// Copyright (C) 2024-2026 Dejoiy

import type { AvatarMenuPlugin } from './index.ts'

export default <AvatarMenuPlugin>{
  key: 'user-documentation',
  label: __('User documentation'),
  permission: ['ticket.agent', 'report', 'knowledge_base.*', 'chat.agent', 'cti.agent'],
  link: 'https://next.zammad.org/en/documentation/use/start.html', // TODO: change link when new user documentation is released
  linkExternal: true,
  openInNewTab: true,
  icon: 'book',
  order: 80,
}
