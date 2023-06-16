import { useRouter } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { getCurrentPosition } from '~/utils/location'
import FONTS from '~/styles/fonts'
import {
  Place_Types,
  useGetNearbyPlacesLazyQuery,
  useGetRatingSummaryLazyQuery,
} from '~/generated-types'
import { PlaceItem } from './PlaceItem'

export function NearbyPlaces() {
  const { t } = useTranslation()
  const router = useRouter()

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

  const [getNearbyPlaces, { data: nearbyPlacesData }] =
    useGetNearbyPlacesLazyQuery()

  const locateCurrentPosition = async () => {
    try {
      const location = await getCurrentPosition()
      getNearbyPlaces({
        variables: {
          lat: location.coords.latitude.toString(),
          lng: location.coords.longitude.toString(),
          radius: 2000,
          type: [
            Place_Types.Building,
            Place_Types.Food,
            Place_Types.Cafe,
            Place_Types.Park,
          ],
          limit: 3,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getRatings({
      variables: {
        placeIds: [...new Set(nearbyPlacesData?.getPlaces.map((p) => p.id))],
      },
    })
  }, [nearbyPlacesData?.getPlaces])

  useEffect(() => {
    locateCurrentPosition()
  }, [])

  if (!nearbyPlacesData || nearbyPlacesData?.getPlaces.length === 0) {
    return null
  }

  return (
    <View
      style={{
        paddingVertical: 24,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 16,
          paddingHorizontal: 16,
        }}
      >
        {t('search.near_me')}
      </Text>

      <View>
        {nearbyPlacesData?.getPlaces.map((place) => (
          <PlaceItem
            key={`nearby-${place.id}`}
            name={place.name!}
            rating={ratings?.[place.id] || 0}
            category={place.type!}
            onPress={() => {
              router.push(`/places/${place.id}`)
            }}
            borderBottom
          />
        ))}
      </View>
    </View>
  )
}
