import COLORS from '~/styles/colors'
import type { IPLACE_TYPE_META } from './placeTypes'
import { PLACE_TYPES_META } from './placeTypes'

function PlaceMetaToMapPref(key: string, data: IPLACE_TYPE_META) {
  return {
    key,
    label: data.label,
    icon: data.icon,
    color: data.color,
  }
}

export const MapPreferences = [
  {
    name: 'conditions',
    label: 'map_prefs_modal.conditions',
    items: [
      {
        key: 'ROUTE',
        label: 'categories.ROUTE',
        icon: 'route',
        color: COLORS.success[400],
      },
      ...Object.entries(PLACE_TYPES_META)
        .filter(([, data]) => data.type === 'condition')
        .map(([key, data]) => PlaceMetaToMapPref(key, data)),
    ],
  },
  {
    name: 'places',
    label: 'map_prefs_modal.places',
    items: [
      ...Object.entries(PLACE_TYPES_META)
        .filter(([, data]) => data.type === 'place')
        .map(([key, data]) => PlaceMetaToMapPref(key, data)),
    ],
  },
]
