import type { ComponentProps } from 'react'
import { Pressable, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import { VerticalDivider } from './VerticalDivider'

interface AccessibilityRatingItemProps {
  name: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  rating: number
  onSelected: (rating: number) => void
}

export function AccessibilityRatingItemSelect({
  name,
  icon,
  rating,
  onSelected,
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
        <VerticalDivider height={24} />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const isSelected = rating >= i + 1

            return (
              <Pressable
                key={`${name}-${i}`}
                onPress={() => {
                  onSelected(i + 1)
                }}
              >
                <MaterialIcons
                  name={isSelected ? 'star' : 'star_outline'}
                  size={24}
                  color={
                    isSelected
                      ? COLORS.warning[300]
                      : COLORS['french-vanilla'][300]
                  }
                />
              </Pressable>
            )
          })}
        </View>
      </View>
    </View>
  )
}
