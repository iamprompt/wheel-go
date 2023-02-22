import { Device } from '@capacitor/device'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useApp } from './useApp'

interface DeviceContext {
  deviceLanguage: string
}

const defaultContext: DeviceContext = {
  deviceLanguage: 'th',
}

const deviceContext = createContext<DeviceContext>(defaultContext)

export const useDevice = () => useContext(deviceContext)

const useDeviceProvider = (): DeviceContext => {
  const { appLanguage, setAppLanguage } = useApp()
  const [state, setState] = useState<DeviceContext>({
    deviceLanguage: 'th',
  })

  const setAppLanguageFromDevice = async () => {
    // Get device language
    const { value: deviceLanguage } = await Device.getLanguageCode()
    setState((prevState) => ({
      ...prevState,
      deviceLanguage,
    }))

    setAppLanguage(deviceLanguage)
  }

  useEffect(() => {
    if (!appLanguage) {
      setAppLanguageFromDevice()
    }
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
