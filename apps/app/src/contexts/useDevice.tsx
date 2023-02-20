import { Device } from '@capacitor/device'
import { Preferences } from '@capacitor/preferences'
import i18next from 'i18next'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface DeviceContext {}

const defaultContext: DeviceContext = {}

const deviceContext = createContext<DeviceContext>(defaultContext)

export const useDevice = () => useContext(deviceContext)

const useDeviceProvider = (): DeviceContext => {
  const [state, setState] = useState<DeviceContext>({
    deviceLanguage: 'th',
  })

  // Change language according to device language
  const setAppLanguage = async () => {
    // Get device language
    const { value: deviceLanguage } = await Device.getLanguageCode()
    setState((prevState) => ({
      ...prevState,
      deviceLanguage,
    }))

    // Check if there is a language set in the preferences
    const { value: appLanguage } = await Preferences.get({
      key: 'appLanguage',
    })

    // Check if the device language is supported
    const supportedLanguages = ['en', 'th']
    const isSupportedLanguage = supportedLanguages.includes(deviceLanguage)

    // If there is no language set in the preferences, set the language to the supported device language
    if (!appLanguage) {
      await Preferences.set({
        key: 'appLanguage',
        value: isSupportedLanguage ? deviceLanguage : 'th',
      })

      i18next.changeLanguage(isSupportedLanguage ? deviceLanguage : 'th')
    } else {
      // If there is a language set in the preferences, set the language to the app language
      i18next.changeLanguage(appLanguage)
    }
  }

  useEffect(() => {
    setAppLanguage()
  }, [])

  return state
}

interface DeviceProviderProps {
  children: ReactNode
}

export const DeviceProvider: FC<DeviceProviderProps> = ({ children }) => {
  const context = useDeviceProvider()

  return (
    <deviceContext.Provider value={context}>{children}</deviceContext.Provider>
  )
}
