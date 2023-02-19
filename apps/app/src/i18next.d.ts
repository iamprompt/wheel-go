import 'i18next'
import 'react-i18next'
import { resources } from './utils/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof resources.th
  }
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof th
  }
}
