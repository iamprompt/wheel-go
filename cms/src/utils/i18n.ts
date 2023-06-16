import i18n, { type Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '~/locales/en.json'
import th from '~/locales/th.json'

export const resources = {
  th,
  en,
} satisfies Resource

i18n.use(initReactI18next).init({
  resources,
  lng: 'th',
  fallbackLng: 'th',
  interpolation: {
    escapeValue: false,
  },
})
