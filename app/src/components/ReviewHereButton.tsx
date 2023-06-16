import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

interface ReviewHereButtonProps {
  placeId: string
}

export function ReviewHereButton({ placeId }: ReviewHereButtonProps) {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Pressable
      style={{
        borderRadius: 12,
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS['french-vanilla'][300],
        borderWidth: 1,
      }}
      onPress={() => {
        router.push(`/places/${placeId}/reviews/new`)
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 16,
        }}
      >
        {t('places.review_here')}
      </Text>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <MaterialIcons
            name="star_outline"
            size={24}
            color={COLORS['french-vanilla'][300]}
            key={index}
          />
        ))}
      </View>
    </Pressable>
  )
}
