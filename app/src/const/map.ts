import type { ComponentProps } from 'react'
import type MapView from 'react-native-maps'

import { Place_Types } from '~/generated-types'

export const MapStyle = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]

export const MapCameraConfig: ComponentProps<typeof MapView> = {
  initialCamera: {
    center: {
      latitude: 13.7952296,
      longitude: 100.3229328,
    },
    pitch: 0,
    heading: 0,
    zoom: 18,
  },
  initialRegion: {
    latitude: 13.7952296,
    longitude: 100.3229328,
    latitudeDelta: 13.795401817195845 - 13.792222587371063,
    longitudeDelta: 100.32550291424202 - 100.32169503265993,
  },
}

export const PinIcon: Record<Place_Types, number> = {
  [Place_Types.Building]: require('~/assets/places/building-pin.png'),
  [Place_Types.Sport]: require('~/assets/places/building-pin.png'),
  [Place_Types.Cafe]: require('~/assets/places/cafe-pin.png'),
  [Place_Types.Food]: require('~/assets/places/food-pin.png'),
  [Place_Types.Transport]: require('~/assets/places/bus-stop-pin.png'),
  [Place_Types.Curbcut]: require('~/assets/places/curbcut-pin.png'),
  [Place_Types.Incident]: require('~/assets/places/incident-pin.png'),
  [Place_Types.Park]: require('~/assets/places/park-pin.png'),
  [Place_Types.Parking]: require('~/assets/places/parking-pin.png'),
  [Place_Types.Toilet]: require('~/assets/places/toilet-pin.png'),
  [Place_Types.Residence]: require('~/assets/places/residence-pin.png'),
  // [Place_Types]: require('~/assets/places/ramp-pin.png'),
}
