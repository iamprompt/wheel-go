// import type { ComponentProps } from 'react'

import COLORS from '~/const/colors'
import { Place_Types } from '~/generated-types'

// import type { MaterialIcons } from '~/utils/icons/MaterialIcons'

interface IMAP_ICON {
  file: any
  size: {
    width: number
    height: number
  }
  centerOffset: {
    x: number
    y: number
  }
}

interface IPLACE_TYPE_META {
  label: string
  icon: string
  color: string
  mapIcon: {
    default: IMAP_ICON
    selected: IMAP_ICON
  }
}

type IPLACE_TYPES = Record<Place_Types, IPLACE_TYPE_META>

export const PLACE_TYPES_META: IPLACE_TYPES = {
  [Place_Types.Building]: {
    label: 'categories.BUILDING',
    icon: 'apartment',
    color: COLORS.info[400],
    mapIcon: {
      default: {
        file: 'images/places/building-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/building-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  // [Place_Types.Incident]: {
  //   label: 'categories.INCIDENT',
  //   icon: 'warning',
  //   color: COLORS.warning[400],
  //   mapIcon: {
  //     default: {
  //       file: 'images/places/incident-pin.png',
  //       size: { width: 24, height: 32 },
  //       centerOffset: { x: 0.5, y: 1 },
  //     },
  //     selected: {
  //       file: 'images/places/incident-selected.png',
  //       size: { width: 40, height: 46 },
  //       centerOffset: { x: 0.5, y: 1 },
  //     },
  //   },
  // },
  [Place_Types.Transport]: {
    label: 'categories.TRANSPORT',
    icon: 'directions_bus',
    color: COLORS.indigo[500],
    mapIcon: {
      default: {
        file: 'images/places/bus-stop-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/bus-stop-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Cafe]: {
    label: 'categories.CAFE',
    icon: 'coffee',
    color: COLORS.toast[500],
    mapIcon: {
      default: {
        file: 'images/places/cafe-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/cafe-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Food]: {
    label: 'categories.FOOD',
    icon: 'restaurant_menu',
    color: COLORS.pomegranate[400],
    mapIcon: {
      default: {
        file: 'images/places/food-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/food-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Toilet]: {
    label: 'categories.TOILET',
    icon: 'wc',
    color: COLORS['fruit-punch'][400],
    mapIcon: {
      default: {
        file: 'images/places/toilet-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/toilet-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Park]: {
    label: 'categories.PARK',
    icon: 'park',
    color: COLORS.lime[400],
    mapIcon: {
      default: {
        file: 'images/places/park-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/park-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Residence]: {
    label: 'categories.RESIDENCE',
    icon: 'cottage',
    color: COLORS.mint[600],
    mapIcon: {
      default: {
        file: 'images/places/residence-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/residence-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Curbcut]: {
    label: 'categories.CURBCUT',
    icon: 'accessible',
    color: COLORS.magenta[400],
    mapIcon: {
      default: {
        file: 'images/places/curbcut-pin.png',
        size: { width: 24, height: 24 },
        centerOffset: { x: 0.5, y: 0.5 },
      },
      selected: {
        file: 'images/places/curbcut-selected.png',
        size: { width: 40, height: 40 },
        centerOffset: { x: 0.5, y: 0.5 },
      },
    },
  },
  [Place_Types.Parking]: {
    label: 'categories.PARKING',
    icon: 'local_parking',
    color: COLORS.jewel[600],
    mapIcon: {
      default: {
        file: 'images/places/parking-pin.png',
        size: { width: 24, height: 32 },
        centerOffset: { x: 0.5, y: 1 },
      },
      selected: {
        file: 'images/places/parking-selected.png',
        size: { width: 40, height: 46 },
        centerOffset: { x: 0.5, y: 1 },
      },
    },
  },
  [Place_Types.Sport]: {
    label: 'categories.SPORT',
    icon: 'sports_basketball',
    color: COLORS.cantaloupe[500],
    mapIcon: {
      default: {
        file: 'images/places/sport-pin.png',
        size: { width: 24, height: 24 },
        centerOffset: { x: 0.5, y: 0.5 },
      },
      selected: {
        file: 'images/places/sport-selected.png',
        size: { width: 40, height: 40 },
        centerOffset: { x: 0.5, y: 0.5 },
      },
    },
  },
}
