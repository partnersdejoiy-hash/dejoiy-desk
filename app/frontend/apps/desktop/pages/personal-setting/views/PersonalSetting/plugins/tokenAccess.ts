// Copyright (C) 2024-2026 Dejoiy

import { useCheckTokenAccess } from '../../../composables/permission/useCheckTokenAccess.ts'

import type { PersonalSettingPlugin } from './types.ts'

export default <PersonalSettingPlugin>{
  label: __('Token access'),
  category: {
    label: __('Security'),
    id: 'category-security',
    order: 9000,
  },
  route: {
    path: 'token-access',
    alias: '/profile/token_access',
    name: 'PersonalSettingTokenAccess',
    component: () => import('../../PersonalSettingTokenAccess.vue'),
    level: 2,
    meta: {
      title: __('Token access'),
      requiresAuth: true,
      requiredPermission: 'user_preferences.access_token',
    },
  },
  order: 4000,
  keywords: __('token access,token,api,access token,application'),
  show: () => {
    const { canUseAccessToken } = useCheckTokenAccess()

    return canUseAccessToken.value
  },
}
