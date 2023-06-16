import * as Localization from 'expo-localization'

import type { LanguageDetectorAsyncModule } from 'i18next'

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    callback(Localization.getLocales()[0].languageCode)
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

export default languageDetector
