import { View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import { FACILITIES } from '~/const/facility'
import type { Facility_Status } from '~/generated-types'
import { HorizontalDivider } from './HorizontalDivider'

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  WARNING = 'WARNING',
  UNKNOWN = 'UNKNOWN',
}

interface FacilitiesAvailabilityStatusProps {
  ramp?: AvailabilityStatus | Facility_Status
  assistance?: AvailabilityStatus | Facility_Status
  elevator?: AvailabilityStatus | Facility_Status
  toilet?: AvailabilityStatus | Facility_Status
  parking?: AvailabilityStatus | Facility_Status
  surface?: AvailabilityStatus | Facility_Status
}

export function AvailabilityIcon({
  availability = AvailabilityStatus.UNKNOWN,
}: {
  availability?: AvailabilityStatus | Facility_Status
}) {
  switch (availability) {
    case AvailabilityStatus.AVAILABLE:
      return (
        <MaterialIcons
          name="check_circle"
          size={16}
          color={COLORS.success[400]}
        />
      )
    case AvailabilityStatus.UNAVAILABLE:
      return <MaterialIcons name="cancel" size={16} color={COLORS.error[500]} />
    case AvailabilityStatus.WARNING:
      return (
        <MaterialIcons name="warning" size={16} color={COLORS.warning[300]} />
      )
    default:
      return <MaterialIcons name="help" size={16} color={COLORS.info[500]} />
  }
}

export function FacilitiesAvailabilityStatus({
  ...props
}: FacilitiesAvailabilityStatusProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {Object.entries(FACILITIES).map(([key, { icon }]) => {
        if (key === 'surface' && !props[key]) {
          return null
        }

        return (
          <View
            key={key}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
              gap: 4,
            }}
          >
            <MaterialIcons name={icon} size={24} />
            <HorizontalDivider width={24} />
            <AvailabilityIcon
              availability={
                props[key as keyof FacilitiesAvailabilityStatusProps]
              }
            />
          </View>
        )
      })}
    </View>
  )
}
