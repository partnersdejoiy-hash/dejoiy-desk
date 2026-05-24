// Copyright (C) 2024-2026 Dejoiy

export interface OrganizationItemData {
  id: string
  internalId: number
  ticketsCount?: {
    open: number
    closed: number
  }
  members?: {
    edges: {
      node: {
        fullname: string
      }
    }[]
    totalCount: number
  }
  active: boolean
  name: string
  updatedAt?: string
  vip?: boolean
  updatedBy?: {
    id: string
    fullname?: Maybe<string>
  }
}
