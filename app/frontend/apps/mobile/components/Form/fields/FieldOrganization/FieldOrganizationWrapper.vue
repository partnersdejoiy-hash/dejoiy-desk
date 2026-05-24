<!-- Copyright (C) 2024-2026 Dejoiy -->
<script setup lang="ts">
import { markRaw } from 'vue'

import { AutocompleteSearchOrganizationDocument } from '#shared/components/Form/fields/FieldOrganization/graphql/queries/autocompleteSearch/organization.api.ts'
import type { AutocompleteOrganizationProps } from '#shared/components/Form/fields/FieldOrganization/types.ts'
import { useFormFieldOrganizationInitialOptionBuilder } from '#shared/components/Form/fields/FieldOrganization/useFieldOrganizationInitialOptionBuilder.ts'

import FieldAutoCompleteInput from '#mobile/components/Form/fields/FieldAutoComplete/FieldAutoCompleteInput.vue'

import FieldOrganizationOptionIcon from './FieldOrganizationOptionIcon.vue'

const props = defineProps<AutocompleteOrganizationProps>()

// eslint-disable-next-line vue/no-mutating-props
Object.assign(props.context, {
  optionIconComponent: markRaw(FieldOrganizationOptionIcon),
  initialOptionBuilder: useFormFieldOrganizationInitialOptionBuilder(),
  gqlQuery: AutocompleteSearchOrganizationDocument,
})
</script>

<template>
  <FieldAutoCompleteInput :context="context" v-bind="$attrs" />
</template>
