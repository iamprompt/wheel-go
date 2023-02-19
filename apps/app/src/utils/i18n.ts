import type { Resource } from 'i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import th from '@/locales/th.json'
import en from '@/locales/en.json'

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
