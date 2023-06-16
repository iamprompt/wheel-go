import type { ComponentProps } from 'react'
import type { KeyboardTypeOptions, TextInput } from 'react-native/types'

interface IRegistrationField {
  label: string
  name: string
  type: string
  placeholder: string
  required: boolean
  keyboardType?: KeyboardTypeOptions
  textContentType?: ComponentProps<typeof TextInput>['textContentType']
  secureTextEntry?: boolean
  href?: string
  valuePrefix?: string
}

export const RegistrationForm: Record<string, IRegistrationField> = {
  username: {
    label: 'auth.register.username',
    name: 'username',
    type: 'text',
    placeholder: 'auth.register.username_placeholder',
    required: true,
    textContentType: 'username',
  },
  email: {
    label: 'auth.register.email',
    name: 'email',
    type: 'email',
    placeholder: 'auth.register.email_placeholder',
    required: true,
    textContentType: 'emailAddress',
    keyboardType: 'email-address',
  },
  password: {
    label: 'auth.register.password',
    name: 'password',
    type: 'password',
    placeholder: 'auth.register.password_placeholder',
    required: true,
    textContentType: 'password',
    secureTextEntry: true,
  },
  password_confirmation: {
    label: 'auth.register.confirm_password',
    name: 'password_confirmation',
    type: 'password',
    placeholder: 'auth.register.confirm_password_placeholder',
    required: true,
    textContentType: 'password',
    secureTextEntry: true,
  },
  firstname: {
    label: 'auth.register.firstname',
    name: 'firstname',
    type: 'text',
    placeholder: 'auth.register.firstname_placeholder',
    required: true,
    textContentType: 'givenName',
  },
  lastname: {
    label: 'auth.register.lastname',
    name: 'lastname',
    type: 'text',
    placeholder: 'auth.register.lastname_placeholder',
    required: true,
    textContentType: 'familyName',
  },
  impairmentLevel: {
    label: 'auth.register.impairment_level',
    name: 'impairmentLevel',
    type: 'link',
    placeholder: 'auth.register.impairment_level_placeholder',
    required: false,
    href: '/impairment',
    valuePrefix: 'impairment_level.',
  },
  equipment: {
    label: 'auth.register.equipment',
    name: 'equipment',
    type: 'link',
    placeholder: 'auth.register.equipment_placeholder',
    required: false,
    href: '/equipment',
    valuePrefix: 'equipment.',
  },
}
