// Copyright (C) 2024-2026 Dejoiy

import { EnumLinkType } from '#shared/graphql/types.ts'

export const useObjectLinkTypes = () => {
  const linkTypes = Object.keys(EnumLinkType)
    .map((key) => ({
      value: EnumLinkType[key as keyof typeof EnumLinkType],
      label: key,
    }))
    .sort((a) => (a.value === EnumLinkType.Normal ? -1 : 1))

  return {
    linkTypes,
  }
}
