// Copyright (C) 2024-2026 Dejoiy

let editorColorMenuClasses = {
  colorSchemeList: {
    base: '',
    button: '',
    autoButton: '',
    autoButtonIcon: '',
  },
}

export const initializeEditorColorMenuClasses = (classes: typeof editorColorMenuClasses) => {
  editorColorMenuClasses = classes
}

export const getEditorColorMenuClasses = () => editorColorMenuClasses
