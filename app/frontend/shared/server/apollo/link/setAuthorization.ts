// Copyright (C) 2024-2026 Dejoiy

import { setContext } from '@apollo/client/link/context'

import { getCSRFToken } from '../utils/csrfToken.ts'

const setAuthorizationLink = setContext((request, { headers }) => ({
  headers: {
    ...headers,

    // Fetch CSRF from head via html embed from Rails.
    'X-CSRF-Token': getCSRFToken(),
  },
}))

export default setAuthorizationLink
