// Copyright (C) 2024-2026 Dejoiy

import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'

import type { CacheInitializerModules } from '#shared/types/server/apollo/client.ts'

import { createApolloClient } from './client.ts'

import type { App } from 'vue'

const initializeApolloClient = (
  app: App,
  cacheInitializerModules: CacheInitializerModules = {},
) => {
  const apolloClient = createApolloClient(cacheInitializerModules)

  app.provide(DefaultApolloClient, apolloClient)

  provideApolloClient(apolloClient)
}

export default initializeApolloClient
