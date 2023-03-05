import type { LatLngTuple } from 'leaflet'
import type { FC } from 'react'
import type { MapContainerProps } from 'react-leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import '@/styles/leaflet.css'
import { CurrentLocationMarker } from '@/utils/Map/CurrentLocationMarker'

interface ExploreMapProps extends MapContainerProps {}

export const ExploreMap: FC<ExploreMapProps> = ({ children, ...props }) => {
  const geo = [13.7952296, 100.3229328] as LatLngTuple

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
      <Marker position={geo}></Marker>
      {/* <Polyline
        positions={arrayPoint4}
        pathOptions={{ color: 'black', opacity: 0.2 }}
      /> */}
      <CurrentLocationMarker />
      {children}
    </MapContainer>
  )
}
