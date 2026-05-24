// Copyright (C) 2024-2026 Dejoiy

let aiAssistantTextTools = {
  popover: {
    base: '',
    item: '',
    button: '',
  },
}

export const initializeAiAssistantTextToolsClasses = (classes: typeof aiAssistantTextTools) => {
  aiAssistantTextTools = classes
}

export const getAiAssistantTextToolsClasses = () => aiAssistantTextTools
