// Copyright (C) 2024-2026 Dejoiy

export interface UserItemData {
  id: string
  firstname?: Maybe<string>
  lastname?: Maybe<string>
  image?: Maybe<string>
  ticketsCount?: {
    open: number
    closed: number
  }
  organization?: {
    name: string
  }
  updatedAt?: string
  updatedBy?: {
    id: string
    fullname?: Maybe<string>
  }
}
