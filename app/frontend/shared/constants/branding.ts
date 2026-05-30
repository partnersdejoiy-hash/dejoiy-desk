// Copyright (C) 2024-2026 Dejoiy

/** Official DEJOIY brand palette (logo: magenta → cyan on navy). */
export const DEJOIY_COLORS = {
  navy: '#001F3F',
  magenta: '#E91E63',
  cyan: '#00BCD4',
  joyPink: '#E91E63',
  white: '#FFFFFF',
  black: '#000000',
} as const

/** DEJOIY internal tools — product identity. */
export const DEJOIY_BRAND = {
  name: 'DEJOIY',
  shortName: 'DEJOIY',
  tagline: 'YOU + JOY',
  websiteUrl: 'https://dejoiy.com',
  supportPath: '/help',
} as const

export const DEJOIY_GRADIENT = {
  /** Icon & accent: magenta → cyan (matches logo tile). */
  icon: `linear-gradient(135deg, ${DEJOIY_COLORS.magenta} 0%, #D946EF 55%, ${DEJOIY_COLORS.cyan} 100%)`,
  brandBar: `linear-gradient(90deg, ${DEJOIY_COLORS.magenta}, #D946EF, ${DEJOIY_COLORS.cyan})`,
  sidebar: `linear-gradient(180deg, #000814 0%, ${DEJOIY_COLORS.navy} 45%, #001a33 100%)`,
  aurora:
    'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(233,30,99,0.35), transparent), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,188,212,0.25), transparent)',
  surfaceGlow:
    '0 0 0 1px rgba(233, 30, 99, 0.12), 0 20px 50px rgba(0, 31, 63, 0.25), 0 8px 24px rgba(0, 188, 212, 0.08)',
} as const

/** Named canvas presets for pages and panels. */
export const DEJOIY_CANVAS = {
  auth: 'dejoiy-canvas-auth',
  workspace: 'dejoiy-canvas-workspace',
  panel: 'dejoiy-canvas-panel',
  hero: 'dejoiy-canvas-hero',
  mesh: 'dejoiy-canvas-mesh',
} as const
