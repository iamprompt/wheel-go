import type { ComponentProps, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { ViewStyle } from 'react-native'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

interface TagProps {
  label?: string | null
  height?: number | string
  width?: number | string
  fullWidth?: boolean
  icon?: ComponentProps<typeof MaterialIcons>['name']
  iconColor?: string
  iconSize?: number
  iconPosition?: 'left' | 'right'
  backgroundColor?: string
  textColor?: string
  textSize?: number
  textWeight?: 'bold' | 'normal'
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  justifyContent?: ViewStyle['justifyContent']
  children?: ReactNode
}

export function Tag({
  height = 48,
  width,
  fullWidth,
  label,
  icon,
  iconColor,
  iconSize,
  iconPosition = 'right',
  backgroundColor = COLORS['french-vanilla'][100],
  textColor,
  textSize = 14,
  textWeight = 'bold',
  borderColor = COLORS['french-vanilla'][300],
  borderWidth = 1,
  borderRadius = 12,
  justifyContent = 'center',
  children,
}: TagProps) {
  const { t } = useTranslation()

  const IconElement = icon ? (
    <MaterialIcons
      name={icon}
      size={iconSize || textSize}
      color={iconColor || textColor || COLORS['french-vanilla'][300]}
    />
  ) : null

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent,
        backgroundColor,
        height,
        width,
        flex: fullWidth ? 1 : 0,
        borderColor,
        borderWidth,
        borderRadius,
        gap: 4,
        paddingHorizontal: 8,
      }}
    >
      {iconPosition === 'left' && IconElement}
      {children ? (
        <>{children}</>
      ) : (
        <Text
          style={{
            fontFamily:
              textWeight === 'bold' ? FONTS.LSTH_BOLD : FONTS.LSTH_REGULAR,
            fontSize: textSize,
            color: textColor || COLORS['french-vanilla'][300],
          }}
        >
          {label ? t(label) : ''}
        </Text>
      )}
      {iconPosition === 'right' && IconElement}
    </View>
  )
}
