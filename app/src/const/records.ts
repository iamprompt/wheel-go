import type { ComponentProps } from 'react'

import type { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'

interface RecordListItem {
  label: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  iconColor: string
  unit: {
    singular: string
    plural: string
  }
  href: string
}

export const RecordListItems = [
  {
    label: 'records.favorite_places',
    icon: 'favorite_border',
    iconColor: COLORS.pomegranate[300],
    unit: {
      singular: 'units.place',
      plural: 'units.places',
    },
    href: '/records/favorites',
  },
  {
    label: 'records.places_reviews',
    icon: 'star_border',
    iconColor: COLORS.warning[400],
    unit: {
      singular: 'units.review',
      plural: 'units.reviews',
    },
    href: '/records/reviews',
  },
  {
    label: 'records.contributed_routes',
    icon: 'route',
    iconColor: COLORS.success[400],
    unit: {
      singular: 'units.route',
      plural: 'units.routes',
    },
    href: '/records/routes',
  },
] satisfies RecordListItem[]
