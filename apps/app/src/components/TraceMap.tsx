import type { LatLngTuple } from 'leaflet'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { MapContainerProps } from 'react-leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import { CurrentLocationMarker } from '@/utils/Map/CurrentLocationMarker'
import { useGeolocation } from '@/contexts/useGeolocation'

enum TracingStatus {
  PREPARE = 'PREPARE',
  TRACING = 'TRACING',
  PAUSE = 'PAUSE',
  FINISHED = 'FINISHED',
}

interface TraceMapProps extends MapContainerProps {}

export const TraceMap: FC<TraceMapProps> = ({ ...props }) => {
  const { latitude, longitude } = useGeolocation()
  const geo = [13.7952296, 100.3229328] as LatLngTuple

  const [tracingData, setTracingData] = useState<LatLngTuple[]>([])
  const [status, setStatus] = useState<TracingStatus>(TracingStatus.PREPARE)

  useEffect(() => {
    if (status === TracingStatus.TRACING && latitude && longitude) {
      setTracingData((prev) => [...prev, [latitude, longitude]])
    }
  }, [latitude, longitude])

  console.log(latitude, longitude)

  // if (!latitude || !longitude) {
  //   return null
  // }

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
    </MapContainer>
  )
}
