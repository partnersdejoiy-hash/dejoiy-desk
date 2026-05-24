<!-- Copyright (C) 2024-2026 Dejoiy -->

<template>
  <CommonBadge tag="div" variant="info" class="flex items-center gap-1">
    <CommonIcon name="checklist" size="xs" />
    <slot name="label">
      <CommonLabel size="small" class="text-current uppercase">
        {{ $t('tracked in') }}
      </CommonLabel>
    </slot>
    <slot />
  </CommonBadge>
</template>
