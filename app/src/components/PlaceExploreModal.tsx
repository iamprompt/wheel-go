import { useRouter } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, Text, View } from 'react-native'

import { getDistance } from 'geolib'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { ListCategoryIcon } from '~/const/category'
import {
  Place_Types,
  useGetNearbyPlacesLazyQuery,
  useGetPlaceByIdQuery,
} from '~/generated-types'
import { AccessibilityRatingOverall } from './AccessibilityRatingOverall'
import { BrandGradient } from './BrandGradient'
import Button, { ButtonVariant } from './Button'
import { FacilitiesAvailabilityStatus } from './FacilitiesAvailabilityStatus'
import { HorizontalDivider } from './HorizontalDivider'

interface PlaceExploreModalProps {
  onClose: () => void
  placeId: string
}

export function PlaceExploreModal({
  onClose,
  placeId,
}: PlaceExploreModalProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const { data: placeData } = useGetPlaceByIdQuery({
    variables: {
      id: placeId,
    },
  })

  const [getNearbyPlaces, { data: nearbyPlacesData }] =
    useGetNearbyPlacesLazyQuery()

  useEffect(() => {
    if (!placeData?.getPlaceById.location) {
      return
    }

    getNearbyPlaces({
      variables: {
        lat: placeData.getPlaceById.location.lat.toString(),
        lng: placeData.getPlaceById.location.lng.toString(),
        radius: 1000,
        limit: 3,
        exclude: [placeId],
        type: [
          Place_Types.Building,
          Place_Types.Food,
          Place_Types.Cafe,
          Place_Types.Park,
          Place_Types.Residence,
        ],
      },
    })
  }, [placeData])

  const nearbyPlaces = useMemo(() => {
    if (!nearbyPlacesData?.getPlaces) {
      return []
    }

    return nearbyPlacesData.getPlaces.map((place) => ({
      ...place,
      distance: getDistance(
        {
          latitude: placeData!.getPlaceById.location!.lat!,
          longitude: placeData!.getPlaceById.location!.lng!,
        },
        { latitude: place.location!.lat!, longitude: place.location!.lng! },
      ),
    }))
  }, [nearbyPlacesData])

  if (!placeData || !placeData.getPlaceById) {
    return null
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        // paddingHorizontal: 16,
        // paddingVertical: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 512,
      }}
    >
      <BrandGradient
        style={{
          padding: 16,
          flexDirection: 'row',
          width: '100%',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
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
              source={ListCategoryIcon[placeData.getPlaceById.type!]}
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
              {t(`categories.${placeData.getPlaceById.type}`)}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 20,
              color: COLORS.white,
            }}
          >
            {getDisplayTextFromCurrentLanguage({
              en: placeData.getPlaceById.name?.en,
              th: placeData.getPlaceById.name?.th,
            })}
          </Text>
        </View>
        <View
          style={{
            flexShrink: 0,
          }}
        >
          <MaterialIcons
            name="close"
            size={24}
            color={COLORS.white}
            onPress={onClose}
          />
        </View>
      </BrandGradient>

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 12,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 14,
            }}
          >
            {t('accessibility_level.title')}
          </Text>
          <AccessibilityRatingOverall
            rating={placeData.getRatingSummaryByPlaceId.overall}
          />
        </View>
        {placeData.getPlaceById.type === Place_Types.Building ? (
          <>
            <HorizontalDivider />
            <View>
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 14,
                }}
              >
                {t('places.facilities_title')}
              </Text>
              <FacilitiesAvailabilityStatus
                ramp={
                  placeData.getRatingSummaryByPlaceId.facilities.RAMP?.status
                }
                assistance={
                  placeData.getRatingSummaryByPlaceId.facilities.ASSISTANCE
                    ?.status
                }
                elevator={
                  placeData.getRatingSummaryByPlaceId.facilities.ELEVATOR
                    ?.status
                }
                toilet={
                  placeData.getRatingSummaryByPlaceId.facilities.TOILET?.status
                }
                parking={
                  placeData.getRatingSummaryByPlaceId.facilities.PARKING?.status
                }
                surface={
                  placeData.getRatingSummaryByPlaceId.facilities.SURFACE?.status
                }
              />
            </View>
          </>
        ) : null}
        <View>
          <Button
            variant={ButtonVariant.Secondary}
            label={t('places.see_place_details')}
            onPress={() => {
              onClose()
              router.push(`/places/${placeId}`)
            }}
          />
        </View>
      </View>
      <HorizontalDivider height={4} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 14,
            }}
          >
            {t('places.nearby_places')}
          </Text>
        </View>

        <View>
          {nearbyPlaces.map((place, i) => {
            if (!place) {
              return null
            }

            return (
              <Pressable
                key={place.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  justifyContent: 'space-between',
                  borderColor: COLORS.soap[100],
                  borderBottomWidth: i === nearbyPlaces.length - 1 ? 0 : 1,
                  gap: 16,
                }}
                onPress={() => {
                  onClose()
                  router.push(`/places/${place.id}`)
                }}
              >
                <View
                  style={{
                    gap: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Image
                    source={ListCategoryIcon[place.type!]}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 12,
                      flex: 1,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {getDisplayTextFromCurrentLanguage({
                      en: place.name?.en,
                      th: place.name?.th,
                    })}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 10,
                      color: COLORS['french-vanilla'][500],
                    }}
                  >
                    {place.distance} {t('units.meters')}
                  </Text>
                </View>
              </Pressable>
            )
          })}
        </View>
      </View>
    </View>
  )
}
