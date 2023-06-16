import type { ComponentProps } from 'react'
import { Pressable } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { GlobalStyle } from '~/styles'

export function WGMapControlButton({
  onPress,
  icon,
  iconColor,
}: {
  onPress: () => void
  icon: ComponentProps<typeof MaterialIcons>['name']
  iconColor?: ComponentProps<typeof MaterialIcons>['color']
}) {
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        ...GlobalStyle.shadow,
      }}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} color={iconColor} />
    </Pressable>
  )
}
