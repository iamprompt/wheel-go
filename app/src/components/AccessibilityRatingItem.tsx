import type { ComponentProps } from 'react'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { VerticalDivider } from './VerticalDivider'

interface AccessibilityRatingItemProps {
  name: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  rating: number
}

export function AccessibilityRatingItem({
  name,
  icon,
  rating,
}: AccessibilityRatingItemProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 12,
        borderColor: COLORS['french-vanilla'][300],
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <MaterialIcons name={icon} size={24} />
        <VerticalDivider />
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <MaterialIcons
              key={`${name}-${i}`}
              name="star"
              size={24}
              color={
                i < rating ? COLORS.warning[300] : COLORS['french-vanilla'][300]
              }
            />
          )
        })}
      </View>
      <View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 14,
            color: COLORS.magenta[500],
          }}
        >
          {(rating || 0).toFixed(1)}
        </Text>
      </View>
    </View>
  )
}
