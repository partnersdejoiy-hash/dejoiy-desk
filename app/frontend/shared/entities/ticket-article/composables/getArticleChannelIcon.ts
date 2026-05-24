// Copyright (C) 2024-2026 Dejoiy

import channelIconsMap from './channelIconsMap.json'

export const getArticleChannelIcon = (articleType: string): string | undefined => {
  const typeGroup = articleType.split(' ')[0]
  return (channelIconsMap as Record<string, string>)[typeGroup]
}
