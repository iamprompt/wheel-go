import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

import dayjs from 'dayjs'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { VerticalDivider } from './VerticalDivider'

export function RouteItem({
  date,
  onPress,
  borderTop,
  borderBottom,
}: {
  date: string
  onPress: () => void
  borderTop?: boolean
  borderBottom?: boolean
}) {
  const { t } = useTranslation()

  return (
    <Pressable
      style={({ pressed: _pressed }) => ({
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderColor: COLORS.soap[100],
        borderTopWidth: borderTop ? 1 : 0,
        borderBottomWidth: borderBottom ? 1 : 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      })}
      onPress={onPress}
    >
      <MaterialIcons name="route" size={24} color={COLORS.success[500]} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 14,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t('records.date')}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              color: COLORS.black,
            }}
          >
            {dayjs(date).format('DD MMM YYYY')}
          </Text>
        </View>
        <VerticalDivider height={24} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 14,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t('records.time')}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              color: COLORS.black,
            }}
          >
            {dayjs(date).format('HH:mm')}
          </Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron_right"
        size={24}
        color={COLORS['french-vanilla'][300]}
      />
    </Pressable>
  )
}
