// Copyright (C) 2024-2026 Dejoiy

import type { EnumSecurityStateType } from '#shared/graphql/types.ts'

import type { FormFieldContext } from '../../types/field.ts'

export { EnumSecurityStateType } from '#shared/graphql/types.ts'

export type SecurityOption = 'encryption' | 'sign'
export type SecurityAllowed = Record<EnumSecurityStateType, SecurityOption[]>
export type SecurityDefaultOptions = SecurityAllowed
export type SecurityValue =
  | { method: EnumSecurityStateType; options: SecurityOption[] }
  | null
  | undefined
export type SecurityMessage = {
  message: string
  messagePlaceholder?: string[]
}
export type SecurityMessages = Record<
  EnumSecurityStateType,
  Record<SecurityOption, SecurityMessage>
>

export type FieldSecurityContext = {
  securityAllowed?: SecurityAllowed
  securityDefaultOptions?: SecurityDefaultOptions
  securityMessages?: SecurityMessages
}

export interface FieldSecurityProps {
  context: FormFieldContext<FieldSecurityContext>
}
