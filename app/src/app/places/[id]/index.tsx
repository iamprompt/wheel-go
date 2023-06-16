import { Image } from 'expo-image'
import * as Linking from 'expo-linking'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import {
  Platform,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { chunk } from '~/utils/array'
import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { AccessibilityRatingContainer } from '~/components/AccessibilityRatingContainer'
import { AccessibilityRatingOverall } from '~/components/AccessibilityRatingOverall'
import { BrandGradient } from '~/components/BrandGradient'
import Button, { ButtonVariant } from '~/components/Button'
import { Tag } from '~/components/common/Tag'
import { FacilitiesAvailabilityStatus } from '~/components/FacilitiesAvailabilityStatus'
import { HeaderLogo } from '~/components/HeaderLogo'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import { IconActionButton } from '~/components/IconActionButton'
import { ImageWithFallback } from '~/components/ImageWithFallback'
import { ReviewHereButton } from '~/components/ReviewHereButton'
import { ReviewItem } from '~/components/ReviewItem'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { ListCategoryIcon } from '~/const/category'
import { FACILITIES } from '~/const/facility'
import { FacilityRatingTag } from '~/const/reviews'
import { useAuth } from '~/context/useAuth'
import {
  Place_Types,
  useAddPlaceToFavoritesMutation,
  useGetPlaceByIdQuery,
  useGetReviewsByPlaceIdQuery,
  useIsFavoritePlaceLazyQuery,
  useRemovePlaceFromFavoritesMutation,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { id } = useSearchParams<{ id: string }>()
  const router = useRouter()

  const { data } = useGetPlaceByIdQuery({
    variables: {
      id: id!,
    },
  })

  const [addFavorites] = useAddPlaceToFavoritesMutation({
    refetchQueries: ['GetMyProfile', 'GetMyFavoritePlaces', 'IsFavoritePlace'],
  })
  const [removeFavorites] = useRemovePlaceFromFavoritesMutation({
    refetchQueries: ['GetMyProfile', 'GetMyFavoritePlaces', 'IsFavoritePlace'],
  })

  const [getIsFavorites] = useIsFavoritePlaceLazyQuery({
    variables: {
      placeId: id!,
    },
  })

  const [isFavorite, setIsFavorite] = useState(false)

  const setInitialIsFavorite = async () => {
    const { data } = await getIsFavorites()
    setIsFavorite(data?.isFavoritePlace || false)
  }

  useEffect(() => {
    setInitialIsFavorite()
  }, [])

  const [contentOffsetY, setContentOffsetY] = useState(0)
  const handlePageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentOffsetY(e.nativeEvent.contentOffset.y)
  }

  const headerColor = useMemo(() => {
    if (contentOffsetY < insets.top + 44) {
      return 'transparent'
    }

    return COLORS.white
  }, [contentOffsetY])

  const headerTitle = useMemo(() => {
    if (contentOffsetY < insets.top + 44) {
      return ''
    }

    return getDisplayTextFromCurrentLanguage({
      en: data?.getPlaceById?.name?.en || '',
      th: data?.getPlaceById?.name?.th || '',
    })
  }, [contentOffsetY, data?.getPlaceById?.name])

  const { data: reviewsData } = useGetReviewsByPlaceIdQuery({
    variables: {
      placeId: id!,
    },
  })

  const { name, address, type, images, metadata, location } =
    data?.getPlaceById || {}

  if (!id || !data?.getPlaceById) {
    return null
  }

  return (
    <ScrollView
      onScroll={handlePageScroll}
      scrollEventThrottle={16}
      style={[GlobalStyle.container]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: headerTitle,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerRight: () => {
            if (!user) {
              return null
            }

            return (
              <Pressable
                onPress={async () => {
                  setIsFavorite(!isFavorite)
                  if (isFavorite) {
                    await removeFavorites({
                      variables: {
                        placeId: id!,
                      },
                    })
                  } else {
                    await addFavorites({
                      variables: {
                        placeId: id!,
                      },
                    })
                  }
                }}
              >
                <MaterialIcons
                  name={isFavorite ? 'favorite' : 'favorite_border'}
                  size={24}
                  color={COLORS.black}
                />
              </Pressable>
            )
          },
        }}
      />

      <StatusBar style="auto" />

      <View
        style={{
          paddingBottom: insets.bottom + 16,
        }}
      >
        <ImageWithFallback
          src={images?.[0]?.url}
          width="100%"
          height={insets.top + 44 + 150}
        />

        <BrandGradient
          style={{
            padding: 16,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <Image
                source={ListCategoryIcon[type!]}
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
                {t(`categories.${type}`)}
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
                en: name?.en,
                th: name?.th,
              })}
            </Text>
          </View>
        </BrandGradient>
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          {address?.th || address?.en ? (
            <View
              style={{
                paddingVertical: 24,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.soap[100],
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                {t('places.address')}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.LSTH_REGULAR,
                  fontSize: 12,
                  color: COLORS['french-vanilla'][500],
                }}
              >
                {getDisplayTextFromCurrentLanguage({
                  en: address.en || '',
                  th: address.th || '',
                })}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              paddingVertical: 24,
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <IconActionButton
              label={t('places.show_on_map')}
              icon="place"
              onPress={() => {
                const address = [location?.lat, location?.lng].join(',')
                const url = Platform.select({
                  ios: `maps:0,0?q=${address}`,
                  android: `geo:0,0?q=${address}`,
                })

                url && Linking.openURL(url)
              }}
            />
            <IconActionButton
              label={t('places.contact')}
              icon="call"
              onPress={() => {
                metadata?.phone &&
                  Linking.openURL(`tel:${metadata.phone.replace(/-\(\)/g, '')}`)
              }}
            />
            <IconActionButton
              label={t('places.website')}
              icon="link"
              onPress={() => {
                metadata?.website && Linking.openURL(metadata.website)
              }}
            />
            <IconActionButton
              label={t('places.share')}
              icon="share"
              onPress={async () => {
                const result = await Share.share({
                  message: metadata?.website || '',
                })
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.soap[100],
            height: 12,
            width: '100%',
          }}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            gap: 16,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 16,
                  flex: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {t('places.accessibility_rating_title')}
              </Text>
              <Pressable
                onPress={() => {
                  router.push(`/places/${id}/reviews`)
                }}
              >
                <Text
                  style={{
                    color: COLORS.info[400],
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 12,
                  }}
                >
                  {t('places.see_reviews')}
                </Text>
              </Pressable>
            </View>
            <AccessibilityRatingOverall
              rating={data.getRatingSummaryByPlaceId.overall}
              reviews={data.getRatingSummaryByPlaceId.reviewCount || 0}
            />
            {data.getPlaceById.type === Place_Types.Building ? (
              <AccessibilityRatingContainer
                style={{
                  marginTop: 24,
                }}
                ratings={{
                  RAMP: data.getRatingSummaryByPlaceId.facilities.RAMP?.rating,
                  ASSISTANCE:
                    data.getRatingSummaryByPlaceId.facilities.ASSISTANCE
                      ?.rating,
                  ELEVATOR:
                    data.getRatingSummaryByPlaceId.facilities.ELEVATOR?.rating,
                  TOILET:
                    data.getRatingSummaryByPlaceId.facilities.TOILET?.rating,
                  PARKING:
                    data.getRatingSummaryByPlaceId.facilities.PARKING?.rating,
                  SURFACE:
                    data.getRatingSummaryByPlaceId.facilities.SURFACE?.rating,
                }}
              />
            ) : null}
          </View>

          <HorizontalDivider />

          {data.getPlaceById.type === Place_Types.Building ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 16,
                    flex: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {t('places.facilities_title')}
                </Text>
                <Pressable
                  onPress={() => {
                    router.push(`/places/${id}/facilities`)
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.info[400],
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 12,
                    }}
                  >
                    {t('places.see_more_details')}
                  </Text>
                </Pressable>
              </View>
              <FacilitiesAvailabilityStatus
                ramp={data.getRatingSummaryByPlaceId.facilities.RAMP?.status}
                assistance={
                  data.getRatingSummaryByPlaceId.facilities.ASSISTANCE?.status
                }
                elevator={
                  data.getRatingSummaryByPlaceId.facilities.ELEVATOR?.status
                }
                toilet={
                  data.getRatingSummaryByPlaceId.facilities.TOILET?.status
                }
                parking={
                  data.getRatingSummaryByPlaceId.facilities.PARKING?.status
                }
                surface={
                  data.getRatingSummaryByPlaceId.facilities.SURFACE?.status
                }
              />
            </View>
          ) : (
            <View
              style={{
                gap: 12,
              }}
            >
              {chunk(Object.entries(FacilityRatingTag), 2).map((row, i) => {
                return (
                  <View
                    key={`accessibility-rating-row-${i}`}
                    style={{
                      flexDirection: 'row',
                      gap: 12,
                    }}
                  >
                    {row.map(([key, value]) => {
                      return (
                        <Tag
                          key={`accessibility-rating-tag-${key}`}
                          fullWidth
                          textSize={12}
                          height={32}
                          justifyContent="space-between"
                        >
                          <Text
                            style={{
                              fontFamily: FONTS.LSTH_REGULAR,
                              fontSize: 12,
                              flex: 1,
                            }}
                          >
                            {t(value)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONTS.LSTH_BOLD,
                              fontSize: 14,
                            }}
                          >
                            {data.getRatingSummaryByPlaceId.tags.find((tag) => {
                              return tag.tag === key
                            })?.count || 0}
                          </Text>
                        </Tag>
                      )
                    })}
                  </View>
                )
              })}
            </View>
          )}
          {user ? (
            <>
              <HorizontalDivider />
              <ReviewHereButton placeId={id} />
            </>
          ) : null}
        </View>

        <HorizontalDivider height={12} />

        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <HeaderLogo />
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 20,
                marginBottom: -8,
              }}
            >
              {t('places.review_text')}
            </Text>
          </View>
          {(reviewsData?.getReviewsByPlaceId?.length || 0) > 0 ? (
            <>
              {reviewsData?.getReviewsByPlaceId?.map((review) => {
                const {
                  id,
                  user,
                  comment,
                  rating,
                  official,
                  images,
                  tags,
                  createdAt,
                } = review || {}

                const Facilities = Object.keys(FACILITIES)
                const isFacilityRating = Facilities.some(
                  (facility) => rating?.[facility as keyof typeof rating],
                )

                const facilityRatings = isFacilityRating
                  ? Facilities.reduce((acc, key) => {
                      const rate = rating?.[key as keyof typeof rating]

                      return {
                        ...acc,
                        [key]: rate,
                      }
                    }, {})
                  : undefined

                const officialComment =
                  official && official.comment && official.timestamp
                    ? {
                        date: official.timestamp,
                        isFlagged: official.isFlagged || false,
                        comment: official.comment,
                      }
                    : undefined

                return (
                  <View
                    key={id}
                    style={{
                      borderColor: COLORS.soap[100],
                      borderBottomWidth: 1,
                      paddingVertical: 24,
                    }}
                  >
                    <ReviewItem
                      reviewer={`${user?.firstname} ${user?.lastname}`}
                      additionalComment={comment || ''}
                      overallRating={rating?.overall || 0}
                      date={createdAt}
                      facilityRatings={facilityRatings}
                      facilityTags={tags || []}
                      officialComment={officialComment}
                      images={
                        images?.map(({ url, id }) => ({
                          id: id!,
                          url: url!,
                        })) || []
                      }
                    />
                  </View>
                )
              })}
            </>
          ) : (
            <>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 32,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 20,
                    textAlign: 'center',
                    color: COLORS['french-vanilla'][500],
                  }}
                >
                  {t('reviews.no_reviews')}
                </Text>
              </View>
            </>
          )}
          <Button
            label={t('reviews.see_all_reviews')}
            variant={ButtonVariant.Secondary}
            onPress={() => {
              router.push(`/places/${id}/reviews`)
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Page
