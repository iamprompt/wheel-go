import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FACILITIES } from '~/const/facility'
import { useGetFacilitiesByPlaceIdQuery } from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const router = useRouter()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { id: placeId } = useSearchParams<{ id: string }>()

  const { data } = useGetFacilitiesByPlaceIdQuery({
    variables: {
      id: placeId!,
    },
  })

  const facilities = useMemo(() => {
    return (
      data?.getFacilitiesByPlaceId?.reduce((acc, cur) => {
        const type = cur.type?.toLowerCase() as keyof typeof FACILITIES

        if (!type || (type && !FACILITIES[type])) {
          return acc
        }

        acc[type] = [...(acc[type] || []), cur]
        return acc
      }, {} as Record<string, any>) || {}
    )
  }, [data])

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          title: t('places.facilities_details') || '',
          headerShown: true,
        }}
      />

      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        {Object.entries(FACILITIES).map(([key, value], i) => {
          if (!facilities[key] || !facilities[key]?.length) {
            return null
          }

          return (
            <View
              key={`facility-${key}`}
              style={{
                marginVertical: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <MaterialIcons
                  name={value.icon}
                  size={24}
                  color={COLORS.magenta[500]}
                />
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                  }}
                >
                  {t(`facilities.${key}`) || key}
                </Text>
              </View>

              <View>
                {facilities[key]?.map((facility: any, i: number) => {
                  return (
                    <View
                      key={`facility-${facility.id}`}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 16,
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.LSTH_BOLD,
                          fontSize: 12,
                        }}
                      >
                        {t(`facilities.spot_no`, { number: i + 1 })}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.LSTH_REGULAR,
                          fontSize: 12,
                          flexWrap: 'wrap',
                          color: COLORS['french-vanilla'][500],
                          flex: 1,
                        }}
                      >
                        {getDisplayTextFromCurrentLanguage(facility.detail)}
                      </Text>
                    </View>
                  )
                })}
              </View>

              <HorizontalDivider />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Page
