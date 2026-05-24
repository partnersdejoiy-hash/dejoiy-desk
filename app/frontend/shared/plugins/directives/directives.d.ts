// Copyright (C) 2024-2026 Dejoiy

import type tooltip from '#shared/plugins/directives/tooltip'

/**
 * Should be support for typed global directives
 * Webstorm IDE does not recognize the global directive
 * Volar should pick it up
 * @link https://github.com/vuejs/core/pull/3399
 */
// declare module '@vue/runtime-core' {
declare module 'vue' {
  export interface GlobalDirectives {
    vTooltip: typeof tooltip.directive
  }
}
