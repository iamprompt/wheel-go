import { useTranslation } from 'react-i18next'
import { Image, Pressable, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { ListCategoryIcon } from '~/const/category'
import type { LanguageObject, Place_Types } from '~/generated-types'
import { BrandGradient } from './BrandGradient'

interface NearbyPlaceBlockProps {
  onPress?: () => void
  category: Place_Types | undefined
  name: LanguageObject | string | undefined
}

export function NearbyPlaceBlock({
  onPress,
  category,
  name,
}: NearbyPlaceBlockProps) {
  const { t } = useTranslation()

  return (
    <Pressable onPress={onPress}>
      <BrandGradient
        style={{
          padding: 16,
          flexDirection: 'row',
          width: '100%',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {category && name ? (
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <Image
                source={ListCategoryIcon[category]}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 14,
                  color: COLORS.white,
                }}
              >
                {t(`categories.${category}`)}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 20,
                color: COLORS.white,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {typeof name === 'object'
                ? getDisplayTextFromCurrentLanguage(name)
                : name}
            </Text>
          </View>
        ) : (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="column" gap={8}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                gap={8}
                alignItems="center"
              >
                <SkeletonPlaceholder.Item
                  marginTop={2}
                  marginLeft={4}
                  width={18}
                  height={18}
                  borderRadius={100}
                />
                <SkeletonPlaceholder.Item width={150} height={16} />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={240}
                height={24}
                opacity={50}
                marginBottom={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
        <View>
          <MaterialIcons name="info_outline" size={24} color={COLORS.white} />
        </View>
      </BrandGradient>
    </Pressable>
  )
}
