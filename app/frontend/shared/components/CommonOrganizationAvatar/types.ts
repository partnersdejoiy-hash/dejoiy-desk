// Copyright (C) 2024-2026 Dejoiy

export interface AvatarOrganization {
  id: string
  name?: Maybe<string>
  active?: Maybe<boolean>
  vip?: Maybe<boolean>
}

export interface OrganizationAvatarClassMap {
  base: string
  inactive: string
}
