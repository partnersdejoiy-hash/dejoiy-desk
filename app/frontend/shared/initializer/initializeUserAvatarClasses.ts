// Copyright (C) 2024-2026 Dejoiy

import type { UserAvatarClassMap } from '#shared/components/CommonUserAvatar/types.ts'

// Provide your own map with the following keys, the values given here are just examples.
let userAvatarClasses: UserAvatarClassMap = {
  backgroundColors: [],
}

export const initializeUserAvatarClasses = (classes: UserAvatarClassMap) => {
  userAvatarClasses = classes
}

export const getUserAvatarClasses = () => userAvatarClasses
