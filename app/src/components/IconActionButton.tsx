import type { ComponentProps } from 'react'
import { Pressable, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

interface IconActionButtonProps {
  icon: ComponentProps<typeof MaterialIcons>['name']
  onPress: () => void
  label: string
}

export function IconActionButton({
  icon,
  onPress,
  label,
}: IconActionButtonProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Pressable
        style={{
          backgroundColor: COLORS.magenta[500],
          width: 48,
          height: 48,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
        onPress={onPress}
      >
        <MaterialIcons name={icon} size={24} color={COLORS.white} />
      </Pressable>
      <Text
        style={{
          fontFamily: FONTS.LSTH_REGULAR,
          fontSize: 12,
          color: COLORS['french-vanilla'][500],
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  )
}
