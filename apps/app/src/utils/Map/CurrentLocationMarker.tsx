import { Geolocation } from '@capacitor/geolocation'
import type { LatLng } from 'leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'

export const CurrentLocationMarker = () => {
  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMap()

  const getCurrentLocation = async () => {
    console.log('Getting current location')

    const location = await Geolocation.getCurrentPosition()
    const latlng = new L.LatLng(
      location.coords.latitude,
      location.coords.longitude
    )
    setPosition(latlng)
    map.flyTo(latlng, 16)
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

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
