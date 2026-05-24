// Copyright (C) 2024-2026 Dejoiy

import { invert } from 'lodash-es'

import { useIcons } from '#shared/components/CommonIcon/useIcons.ts'

const createCustomIcons = (): Record<string, string> => {
  const { icons: customIcons, aliases: customIconAliases } = useIcons()
  const reversedCustomIconAliases = invert(customIconAliases)

  return Object.keys(customIcons).reduce((icons: Record<string, string>, name) => {
    const alias = reversedCustomIconAliases[name]
    icons[alias || name] = customIcons[name]

    return icons
  }, {})
}

export default createCustomIcons
