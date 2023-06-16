import type { ComponentProps } from 'react'

import type { MaterialIcons } from '~/utils/icons/MaterialIcons'

export type FacilitiesKey = Record<
  string,
  {
    label: string
    icon: ComponentProps<typeof MaterialIcons>['name']
  }
>

export const FACILITIES = {
  ramp: {
    label: 'ramp',
    icon: 'signal_cellular_4_bar',
  },
  assistance: {
    label: 'assistance',
    icon: 'wheelchair_pickup',
  },
  toilet: {
    label: 'toilet',
    icon: 'wc',
  },
  elevator: {
    label: 'elevator',
    icon: 'elevator',
  },
  parking: {
    label: 'parking',
    icon: 'local_parking',
  },
  surface: {
    label: 'surface',
    icon: 'texture',
  },
} satisfies FacilitiesKey
