import { Preferences } from '@capacitor/preferences'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AppContext {
  appLanguage: string
  setAppLanguage: (language: string) => Promise<void>
}

const defaultContext: AppContext = {
  appLanguage: 'th',
  setAppLanguage: async () => {},
}

const appContext = createContext<AppContext>(defaultContext)

export const useApp = () => useContext(appContext)

const useAppProvider = (): AppContext => {
  const { i18n } = useTranslation()
  const [state, setState] = useState({
    appLanguage: 'th',
  })

  // Change language according to device language
  const setAppLanguage = async (language: string) => {
    console.log('setAppLanguage', language)

    // Check if the device language is supported
    const supportedLanguages = ['en', 'th']
    const isSupportedLanguage = supportedLanguages.includes(language)

    // If there is no language set in the preferences, set the language to the supported device language
    if (isSupportedLanguage) {
      await Preferences.set({
        key: 'appLanguage',
        value: isSupportedLanguage ? language : 'th',
      })

      i18n.changeLanguage(isSupportedLanguage ? language : 'th')
      setState((prevState) => ({
        ...prevState,
        appLanguage: isSupportedLanguage ? language : 'th',
      }))
    } else {
      await setAppLanguage('th')
    }
  }

  const setAppLanguageFromPreferences = async () => {
    const { value: appLanguage } = await Preferences.get({
      key: 'appLanguage',
    })

    if (appLanguage) {
      setState((prevState) => ({
        ...prevState,
        appLanguage,
      }))

      setAppLanguage(appLanguage)
    }
  }

  useEffect(() => {
    setAppLanguageFromPreferences()
  }, [])

  return { ...state, setAppLanguage }
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const context = useAppProvider()

  return <appContext.Provider value={context}>{children}</appContext.Provider>
}
