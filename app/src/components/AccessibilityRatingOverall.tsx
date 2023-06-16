import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { AccessibilityLevels } from '~/const/accessibilityLevels'
import { VerticalDivider } from './VerticalDivider'

interface AccessibilityRatingOverallProps {
  rating: number
  reviews?: number
}

export function AccessibilityRatingOverall({
  rating,
  reviews,
}: AccessibilityRatingOverallProps) {
  const { t } = useTranslation()

  const ratingValue = parseFloat(rating.toFixed(1))

  const ratingText = AccessibilityLevels.find((level) => {
    return ratingValue >= level.min && ratingValue <= level.max
  })?.label

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          paddingHorizontal: reviews ? 24 : 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 24,
            }}
          >
            {(rating || 0).toFixed(1)}
          </Text>
          <MaterialIcons name="star" size={24} color={COLORS.warning[300]} />
        </View>
        {reviews !== undefined ? (
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 12,
              color: COLORS['french-vanilla'][500],
              textAlign: 'center',
            }}
          >
            {reviews} {t('units.reviews')}
          </Text>
        ) : null}
      </View>
      <VerticalDivider height={reviews ? 40 : 24} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {t(ratingText || '')}
        </Text>
      </View>
    </View>
  )
}
