import type { ComponentProps } from 'react'

import type { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'

interface TagLabel {
  label: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  color: string
}

export const TagsLabel: Record<string, TagLabel> = {
  building: {
    label: 'categories.BUILDING',
    icon: 'apartment',
    color: COLORS.info[400],
  },
  incident: {
    label: 'categories.INCIDENT',
    icon: 'warning',
    color: COLORS.error[400],
  },
  transport: {
    label: 'categories.TRANSPORT',
    icon: 'directions_bus',
    color: COLORS.indigo[500],
  },
  cafe: {
    label: 'categories.CAFE',
    icon: 'coffee',
    color: COLORS.toast[500],
  },
  food: {
    label: 'categories.FOOD',
    icon: 'restaurant_menu',
    color: COLORS.pomegranate[400],
  },
  toilet: {
    label: 'categories.TOILET',
    icon: 'wc',
    color: COLORS['fruit-punch'][600],
  },
  park: {
    label: 'categories.PARK',
    icon: 'park',
    color: COLORS.lime[400],
  },
  residence: {
    label: 'categories.RESIDENCE',
    icon: 'cottage',
    color: COLORS.mint[600],
  },
  'curb-cut': {
    label: 'categories.CURBCUT',
    icon: 'accessible',
    color: COLORS.magenta[500],
  },
}
