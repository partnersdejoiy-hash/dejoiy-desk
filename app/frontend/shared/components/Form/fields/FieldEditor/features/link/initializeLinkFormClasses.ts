// Copyright (C) 2024-2026 Dejoiy

let editorLinkFormClasses = {
  button: {
    danger: '',
    secondary: '',
    primary: '',
  },
  buttonContainer: '',
  form: '',
}

export const initializeEditorLinkFormClasses = (classes: typeof editorLinkFormClasses) => {
  editorLinkFormClasses = classes
}

export const getEditorEditorLinkFormClasses = () => editorLinkFormClasses
