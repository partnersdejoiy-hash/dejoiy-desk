// Copyright (C) 2024-2026 Dejoiy

import { EnumTwoFactorAuthenticationMethod } from '#shared/graphql/types.ts'

import type { TwoFactorPlugin } from '../types.ts'

export default {
  name: EnumTwoFactorAuthenticationMethod.AuthenticatorApp,
  label: __('Authenticator app'),
  description: __('Get the security code from the authenticator app on your device.'),
  order: 200,
  icon: '2fa-authenticator-app',
  loginOptions: {
    helpMessage: __('Enter the code from your two-factor authenticator app.'),
  },
} satisfies TwoFactorPlugin
