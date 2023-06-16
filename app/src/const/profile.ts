import type { ComponentProps } from 'react'

import { format, FormatEnum } from '~/utils/dayjs'
import type { MaterialIcons } from '~/utils/icons/MaterialIcons'

interface SummaryDetail {
  label: string
  key: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  format?: (value: any) => string
  unit?: string
}

export const SUMMARY_DETAILS: Array<SummaryDetail> = [
  {
    key: 'distance',
    label: 'profile.summary_details.total_distance',
    icon: 'accessible_forward',
    unit: 'kilometers',
    format: (value: number) => `${(value / 1000).toFixed(2)}`,
  },
  {
    key: 'routes',
    label: 'profile.summary_details.total_routes',
    icon: 'draw',
    unit: 'routes',
  },
  {
    key: 'reviews',
    label: 'profile.summary_details.total_reviews',
    icon: 'rate_review',
    unit: 'reviews',
  },
  {
    key: 'joinedAt',
    label: 'profile.summary_details.joined_at',
    icon: 'access_time_filled',
    format: (value: string) => format(value, [FormatEnum.DATE]),
  },
]
