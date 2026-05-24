// Copyright (C) 2024-2026 Dejoiy

import mainInitializeApolloClient from '#shared/server/apollo/index.ts'
import type {
  InitializeAppApolloClient,
  CacheInitializerModules,
} from '#shared/types/server/apollo/client.ts'

import type { App } from 'vue'

export const cacheInitializerModules: CacheInitializerModules = import.meta.glob(
  './cache/initializer/*.ts',
  { eager: true },
)

const initializeApolloClient: InitializeAppApolloClient = (app: App) => {
  mainInitializeApolloClient(app, cacheInitializerModules)
}

export default initializeApolloClient
