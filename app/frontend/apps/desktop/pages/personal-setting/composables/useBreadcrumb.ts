// Copyright (C) 2024-2026 Dejoiy

import type { BreadcrumbItem } from '#desktop/components/CommonBreadcrumb/types.ts'

export const useBreadcrumb = (currentItem: string | BreadcrumbItem) => {
  const baseBreadcrumbItem: BreadcrumbItem = {
    label: __('Profile'),
    route: '/personal-setting',
  }

  const breadcrumbItems: BreadcrumbItem[] = [baseBreadcrumbItem]

  if (typeof currentItem === 'string') {
    breadcrumbItems.push({
      label: currentItem,
    })
  } else {
    breadcrumbItems.push(currentItem)
  }

  return {
    breadcrumbItems,
  }
}
