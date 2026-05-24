<!-- Copyright (C) 2024-2026 Dejoiy -->

<script setup lang="ts">
import type { ThirdPartyAuthProvider } from '#shared/types/authentication.ts'

import CommonThirdPartyAuthenticationButton from '#desktop/components/CommonThirdPartyAuthenticationButton/CommonThirdPartyAuthenticationButton.vue'

export interface Props {
  providers: ThirdPartyAuthProvider[]
}

defineProps<Props>()
</script>

<template>
  <section class="mt-2.5 w-full" data-test-id="loginThirdParty">
    <div class="mb-2.5 flex justify-center">
      <CommonLabel>
        {{ $c.user_show_password_login ? $t('Or sign in using') : $t('Sign in using') }}
      </CommonLabel>
    </div>
    <div class="flex flex-wrap gap-2">
      <CommonThirdPartyAuthenticationButton
        v-for="provider of providers"
        :key="provider.name"
        class="grow basis-[calc(50%-theme(spacing.2))]"
        :url="provider.url"
        :button-prefix-icon="provider.icon"
        button-size="large"
        button-block
        button-variant="primary"
        :button-label="provider.label"
      >
        {{ $t(provider.label) }}
      </CommonThirdPartyAuthenticationButton>
    </div>
  </section>
</template>
