// Copyright (C) 2024-2026 Dejoiy

import renderComponent, { type ExtendedRenderResult } from './renderComponent.ts'

const components = new Set<ExtendedRenderResult>()
afterEach(() => {
  components.forEach((component) => {
    component.unmount()
  })
})

export const mounted = <T>(fn: () => T) => {
  let result: T
  const component = renderComponent({
    template: '<div></div>',
    setup() {
      result = fn()
    },
  })
  components.add(component)
  // @ts-expect-error doesn't know that setup is called in sync
  return result
}
