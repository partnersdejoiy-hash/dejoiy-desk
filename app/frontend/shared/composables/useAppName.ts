// Copyright (C) 2024-2026 Dejoiy

import type { AppName } from '#shared/types/app.ts'

let appName: AppName

export const initializeAppName = (name: AppName) => {
  appName = name
}

export const useAppName = () => appName
