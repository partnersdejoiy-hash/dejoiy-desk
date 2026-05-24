// Copyright (C) 2024-2026 Dejoiy

export const useTransitionConfig = () => {
  const durations = {
    normal: { enter: 300, leave: 200 },
  }

  const timings = {
    short: 200,
    veryShort: 100,
  }

  return { durations, timings }
}
