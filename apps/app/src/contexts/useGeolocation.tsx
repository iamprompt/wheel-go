import type { Position, PositionOptions } from '@capacitor/geolocation'
import { Geolocation } from '@capacitor/geolocation'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface GeolocationContext {
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
}

const defaultContext: GeolocationContext = {
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
  timestamp: Date.now(),
}

const geolocationContext = createContext<GeolocationContext>(defaultContext)

export const useGeolocation = () => useContext(geolocationContext)

const GeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
} satisfies PositionOptions

const useGeolocationProvider = (): GeolocationContext => {
  const [state, setState] = useState<GeolocationContext>({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  })

  const [watchId, setWatchId] = useState<string | null>(null)

  const onPositionChange = (position: Position | null) => {
    console.log('position', position)

    if (position) {
      setState({
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy || null,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      })
    }
  }

  const initWatchPosition = async () => {
    const watchIdLocal = await Geolocation.watchPosition(
      GeolocationOptions,
      onPositionChange
    )

    setWatchId(watchIdLocal)
  }

  useEffect(() => {
    initWatchPosition()
    return () => {
      if (watchId === null) {
        return
      }
      Geolocation.clearWatch({ id: watchId })
    }
  }, [])

  return state
}

interface GeolocationProviderProps {
  children: ReactNode
}

export const GeolocationProvider: FC<GeolocationProviderProps> = ({
  children,
}) => {
  const context = useGeolocationProvider()

  console.log('context', context)

  return (
    <geolocationContext.Provider value={context}>
      {children}
    </geolocationContext.Provider>
  )
}
