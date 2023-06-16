import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import languageDetector from './language-detector'
import en from './locales/en.json'
import th from './locales/th.json'

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: {
      th: {
        translation: th,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })
