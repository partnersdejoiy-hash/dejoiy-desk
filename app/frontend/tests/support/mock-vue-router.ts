// Copyright (C) 2024-2026 Dejoiy

export const mockRouterHooks = () => {
  vi.mock('vue-router', async () => {
    const module = await vi.importActual<typeof import('vue-router')>('vue-router')

    return {
      ...module,
      onBeforeRouteUpdate: vi.fn(),
      onBeforeRouteLeave: vi.fn(),
    }
  })
}
