import { Image, Pressable, Text, View } from 'react-native'

import dayjs from 'dayjs'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { ListCategoryIcon } from '~/const/category'
import type { LanguageObject, Place_Types } from '~/generated-types'
import { VerticalDivider } from './VerticalDivider'

export function PlaceItem({
  name,
  rating,
  category,
  date,
  onPress,
  borderTop,
  borderBottom,
}: {
  name: LanguageObject | string
  rating: number
  category: Place_Types
  date?: string
  onPress: () => void
  borderTop?: boolean
  borderBottom?: boolean
}) {
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
      <Image
        source={ListCategoryIcon[category]}
        style={{
          width: 32,
          height: 32,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          {typeof name === 'object'
            ? getDisplayTextFromCurrentLanguage(name)
            : name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 16,
                color: COLORS.magenta[500],
              }}
            >
              {rating}
            </Text>
            <MaterialIcons name="star" size={24} color={COLORS.warning[300]} />
          </View>
          {date ? (
            <>
              <VerticalDivider />
              <Text
                style={{
                  fontFamily: FONTS.LSTH_REGULAR,
                  fontSize: 10,
                  color: COLORS['french-vanilla'][500],
                }}
              >
                {dayjs(date).format('DD MMMM YYYY')}
              </Text>
            </>
          ) : null}
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
