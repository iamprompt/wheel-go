import { Stack, useRouter } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { PlaceItem } from '~/components/PlaceItem'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import {
  useGetMyFavoritePlacesQuery,
  useGetRatingSummaryLazyQuery,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'

export default function Page() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const { data } = useGetMyFavoritePlacesQuery()

  const [getRatings, { data: ratingData }] = useGetRatingSummaryLazyQuery()

  const ratings = useMemo(() => {
    return ratingData?.getRatingSummaryByPlaceIds.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.overall,
      }),
      {} as Record<string, number>,
    )
  }, [ratingData])

  useEffect(() => {
    if (data) {
      getRatings({
        variables: {
          placeIds: [
            ...new Set(
              data.me.metadata?.favorites
                ?.filter((place) => place.place)
                .map((p) => p.place!.id) || [],
            ),
          ],
        },
      })
    }
  }, [data])

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />

      <View
        style={{
          marginTop: insets.top + 44 + 16,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              padding: 12,
              backgroundColor: COLORS.pomegranate[300],
              borderRadius: 35,
              width: 70,
              height: 70,
              borderColor: COLORS.white,
              borderWidth: 3,
              shadowColor: COLORS.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <MaterialIcons name="favorite" size={40} color={COLORS.white} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 20,
              color: COLORS.pomegranate[300],
            }}
          >
            {t('records.favorite_places')}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 14,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {data?.me.metadata?.favorites?.length} {t('units.places')}
          </Text>
        </View>
        <View
          style={{
            marginTop: 24,
          }}
        >
          {data?.me.metadata?.favorites?.map((favoritePlace, i) => {
            if (!favoritePlace.place) {
              return null
            }

            const { place } = favoritePlace

            return (
              <PlaceItem
                key={`favoritePlace-${place.id}-${i}`}
                name={place.name?.th || place.name?.en || ''}
                rating={4.5}
                category={place.type!}
                date={favoritePlace.addedAt}
                onPress={() => {
                  router.push(`/places/${place.id}`)
                }}
                borderTop={i === 0}
                borderBottom
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
