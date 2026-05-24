// Copyright (C) 2024-2026 Dejoiy

import type { BarSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

export type BarChartOptions = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | GridComponentOption
>
