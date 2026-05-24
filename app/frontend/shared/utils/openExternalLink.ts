// Copyright (C) 2024-2026 Dejoiy

const openExternalLink = (url: string, target: string = '_blank', filename: string = '') => {
  const link = document.createElement('a')
  link.href = url
  link.target = target
  if (filename) link.download = filename
  link.click()
  link.remove()
}

export default openExternalLink
