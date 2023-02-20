import type { LatLng } from 'leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { useGeolocation } from '@/contexts/useGeolocation'

export const CurrentLocationMarker = () => {
  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMap()
  const { latitude, longitude } = useGeolocation()

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return
    }

    const latlng = new L.LatLng(latitude, longitude)
    setPosition(latlng)
    map.flyTo(latlng, 16)
  }, [latitude, longitude, map])

  return position === null ? null : (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: '/images/map/current-location-marker.png',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      })}
    />
  )
}
