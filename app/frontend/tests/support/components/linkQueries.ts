// Copyright (C) 2024-2026 Dejoiy

import { getElementError } from '@testing-library/vue'

export const getLinkFromElement = (container: HTMLElement, element: Element): HTMLAnchorElement => {
  const link = element.closest('a') as HTMLAnchorElement | null

  if (!link) {
    throw getElementError('Recieved element is not wrapped inside a link', container)
  }

  return link
}

export default function buildLinksQueries(container: HTMLElement) {
  return {
    getLinkFromElement: getLinkFromElement.bind(null, container),
  }
}
