// Copyright (C) 2024-2026 Dejoiy

let aiAssistantTextToolsLoadingBanner = {
  icon: '',
  label: '',
  button: '',
}

export const initializeAiAssistantTextToolsLoadingBannerClasses = (
  classes: typeof aiAssistantTextToolsLoadingBanner,
) => {
  aiAssistantTextToolsLoadingBanner = classes
}

export const getAiAssistantTextToolsLoadingBannerClasses = () => aiAssistantTextToolsLoadingBanner
