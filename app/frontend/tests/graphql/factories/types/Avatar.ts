// Copyright (C) 2024-2026 Dejoiy

import { faker } from '@faker-js/faker'

import type { Avatar } from '#shared/graphql/types.ts'

export default (): Partial<Avatar> => {
  return {
    imageFull: faker.image.dataUri(),
    imageResize: faker.image.dataUri(),
  }
}
