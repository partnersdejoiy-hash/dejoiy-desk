// Copyright (C) 2024-2026 Dejoiy

/** DEJOIY internal tools — product identity (UI only; server name comes from settings). */
export const DEJOIY_BRAND = {
  name: 'DEJOIY',
  shortName: 'DEJOIY',
  tagline: 'Internal tools for your team',
  websiteUrl: 'https://dejoiy.com',
  supportPath: '/help',
} as const

export const DEJOIY_GRADIENT = {
  brandBar: 'linear-gradient(90deg, #EC4899, #A855F7, #3B82F6)',
  sidebar: 'linear-gradient(180deg, #1a0533 0%, #0f1547 55%, #050d24 100%)',
  surfaceGlow:
    '0 25px 60px rgba(168, 85, 247, 0.12), 0 10px 25px rgba(0, 0, 0, 0.35)',
} as const
