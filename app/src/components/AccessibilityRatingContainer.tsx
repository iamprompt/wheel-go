import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FACILITIES } from '~/const/facility'
import { AccessibilityRatingItem } from './AccessibilityRatingItem'

type AccessibilityRatingContainerProps = Omit<
  ComponentProps<typeof View>,
  'children'
> & {
  ratings: Record<keyof typeof FACILITIES | string, number | undefined>
}

export function AccessibilityRatingContainer({
  ratings,
  ...props
}: AccessibilityRatingContainerProps) {
  const { t } = useTranslation()

  return (
    <View {...props}>
      {Object.entries(FACILITIES).map(([key, { label, icon }]) => {
        return (
          <View
            key={`accessibility-rating-${key}`}
            style={{
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 12,
                }}
              >
                {t(`facilities.${label}`)}
              </Text>
              <MaterialIcons
                name="info_outline"
                color={COLORS['french-vanilla'][300]}
                size={16}
              />
            </View>
            <AccessibilityRatingItem
              name={key}
              icon={icon}
              rating={ratings[key.toUpperCase()] || 0}
            />
          </View>
        )
      })}
    </View>
  )
}
