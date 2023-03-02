import type { LatLngTuple } from 'leaflet'
import type { FC } from 'react'
import type { MapContainerProps } from 'react-leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import '@/styles/leaflet.css'
import { CurrentLocationMarker } from '@/utils/Map/CurrentLocationMarker'
import { useGeolocation } from '@/contexts/useGeolocation'

interface TraceMapProps extends MapContainerProps {}

export const TraceMap: FC<TraceMapProps> = ({ children, ...props }) => {
  const { latitude, longitude } = useGeolocation()
  const geo = [latitude, longitude] as LatLngTuple

  return (
    <MapContainer
      center={geo}
      zoomControl={false}
      minZoom={15}
      maxZoom={18}
      zoom={16}
      scrollWheelZoom={true}
      className="z-[1] h-screen w-screen"
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Polyline
        positions={arrayPoint4}
        pathOptions={{ color: 'black', opacity: 0.2 }}
      /> */}
      <CurrentLocationMarker />
      {children}
    </MapContainer>
  )
}
