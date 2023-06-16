import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import type { ViewStyle } from 'react-native'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import type { TRACING_STATES } from '~/const/trace'
import { TRACING_STATUS_BADGES } from '~/const/trace'

type TracingStatusIndicatorProps = Omit<
  ComponentProps<typeof View>,
  'style'
> & {
  style?: ViewStyle
  status: TRACING_STATES
}

export function TracingStatusIndicator({
  style,
  status,
  ...props
}: TracingStatusIndicatorProps) {
  const { t } = useTranslation()

  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: TRACING_STATUS_BADGES[status].color,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        ...style,
      }}
      {...props}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: 16,
          fontFamily: FONTS.LSTH_BOLD,
        }}
      >
        {t(TRACING_STATUS_BADGES[status].label)}
      </Text>
      <MaterialIcons
        name={TRACING_STATUS_BADGES[status].icon}
        size={24}
        color={COLORS.white}
      />
    </View>
  )
}
