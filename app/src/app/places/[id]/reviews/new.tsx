import type { ImagePickerAsset } from 'expo-image-picker'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { ReactNativeFile } from 'apollo-upload-client'

import { chunk } from '~/utils/array'
import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { AccessibilityRatingItemSelect } from '~/components/AccessibilityRatingItemSelect'
import Button from '~/components/Button'
import { Tag } from '~/components/common/Tag'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import { VerticalDivider } from '~/components/VerticalDivider'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { ListCategoryIcon } from '~/const/category'
import { FACILITIES } from '~/const/facility'
import { AccessibilityRating, FacilityRatingTag } from '~/const/reviews'
import {
  Place_Types,
  useCreateReviewMutation,
  useGetPlaceByIdQuery,
  useUploadMediaMutation,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const router = useRouter()

  const { id: placeId } = useSearchParams<{ id: string }>()
  const { data: placeData } = useGetPlaceByIdQuery({
    variables: {
      id: placeId!,
    },
  })

  const [createReview] = useCreateReviewMutation({
    refetchQueries: ['GetMyReviews', 'GetReviewsByPlaceId', 'GetPlaceById'],
  })
  const [uploadMedia] = useUploadMediaMutation()

  const [overallRating, setOverallRating] = useState<number>(-1)
  const overallRatingDescription = useMemo(() => {
    return (
      AccessibilityRating[overallRating]?.description ||
      'reviews.accessibility_rating.description'
    )
  }, [overallRating])

  const [facilityRating, setFacilityRating] = useState<Record<string, number>>(
    {},
  )

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([])
  const [additionalComment, setAdditionalComment] = useState<string>('')

  const handlePickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false,
    })

    if (!result.canceled) {
      setSelectedImages((prev) => [...prev, result.assets[0]])
    }
  }

  const handleSubmit = async () => {
    const images = selectedImages.map((image) => {
      return new ReactNativeFile({
        uri: image.uri,
        type: image.type,
        name: image.fileName || 'image.jpg',
      })
    })

    const uploadResults = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await uploadMedia({
            variables: {
              file: image,
            },
          })

          return result.data
        } catch (error) {
          console.log('error', error)
          throw error
        }
      }),
    )

    const payloadResult = await createReview({
      variables: {
        input: {
          place: placeId!,
          comment: additionalComment,
          rating: {
            overall: overallRating,
            ...facilityRating,
          },
          tags: selectedTags,
          images:
            uploadResults
              .filter((r) => r?.uploadMedia.id)
              .map((result) => result!.uploadMedia.id) || [],
        },
      },
    })

    router.replace(`/places/${placeId}`)
  }

  if (!placeData?.getPlaceById) {
    return null
  }

  return (
    <KeyboardAwareScrollView
      style={[GlobalStyle.container]}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          title: 'Reviews',
          headerShown: true,
        }}
      />

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <Image
            source={ListCategoryIcon[placeData.getPlaceById.type!]}
            style={{
              width: 32,
              height: 32,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 16,
                marginBottom: 4,
              }}
            >
              {t('reviews.rate_this_place')}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.LSTH_REGULAR,
                fontSize: 12,
                color: COLORS['french-vanilla'][500],
              }}
            >
              {getDisplayTextFromCurrentLanguage({
                en: placeData.getPlaceById.name?.en,
                th: placeData.getPlaceById.name?.th,
              })}
            </Text>
          </View>
        </View>
        <HorizontalDivider />

        <View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const isSelected = overallRating >= index + 1

              return (
                <Pressable
                  key={`star-${index}`}
                  onPress={() => {
                    if (overallRating === index + 1) {
                      setOverallRating(-1)
                      return
                    }

                    setOverallRating(index + 1)
                  }}
                >
                  <MaterialIcons
                    name={isSelected ? 'star' : 'star_outline'}
                    size={48}
                    color={
                      isSelected
                        ? COLORS.warning[300]
                        : COLORS['french-vanilla'][300]
                    }
                  />
                </Pressable>
              )
            })}
          </View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 12,
              color: COLORS['french-vanilla'][500],
              textAlign: 'center',
            }}
          >
            {t(overallRatingDescription)}
          </Text>
        </View>

        <HorizontalDivider />

        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            {t('reviews.accessibility_rating.criteria_title')}
          </Text>
          <View
            style={{
              gap: 8,
            }}
          >
            {Object.entries(AccessibilityRating).map(
              ([key, { description }]) => {
                return (
                  <View
                    key={`accessibility-rating-${key}`}
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 7,
                        alignItems: 'center',
                        width: 32,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.LSTH_BOLD,
                          fontSize: 12,
                          width: 8,
                        }}
                      >
                        {key}
                      </Text>
                      <MaterialIcons
                        name={key === '0' ? 'star_outline' : 'star'}
                        size={16}
                        color={COLORS.magenta[500]}
                      />
                    </View>
                    <VerticalDivider height={16} />
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_REGULAR,
                        fontSize: 10,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      {t(description)}
                    </Text>
                  </View>
                )
              },
            )}
          </View>
        </View>

        <HorizontalDivider />

        {placeData.getPlaceById.type === Place_Types.Building ? (
          <View>
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              {t('reviews.facility')}
            </Text>
            <View>
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
                    <AccessibilityRatingItemSelect
                      name={key}
                      icon={icon}
                      rating={facilityRating[key]}
                      onSelected={(rating) => {
                        if (rating === facilityRating[key]) {
                          setFacilityRating((prev) => ({
                            ...prev,
                            [key]: -1,
                          }))

                          return
                        }

                        setFacilityRating((prev) => ({
                          ...prev,
                          [key]: rating,
                        }))
                      }}
                    />
                  </View>
                )
              })}
            </View>
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
                    const isSelected = selectedTags.includes(key)

                    return (
                      <Pressable
                        key={`accessibility-rating-${key}`}
                        style={{
                          flex: 1,
                        }}
                        onPress={() => {
                          if (isSelected) {
                            setSelectedTags((prev) =>
                              prev.filter((tag) => tag !== key),
                            )
                            return
                          }

                          setSelectedTags((prev) => [...prev, key])
                        }}
                      >
                        <Tag
                          label={t(value)}
                          fullWidth
                          textSize={12}
                          height={32}
                          borderColor={
                            isSelected
                              ? COLORS.magenta[500]
                              : COLORS['french-vanilla'][300]
                          }
                        />
                      </Pressable>
                    )
                  })}
                </View>
              )
            })}
          </View>
        )}
      </View>

      <HorizontalDivider height={12} />

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 24,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            {t('reviews.details')}
          </Text>
          <View>
            <TextInput
              editable
              multiline
              placeholder={t('reviews.details_placeholder') || ''}
              numberOfLines={3}
              maxLength={200}
              value={additionalComment}
              onChangeText={setAdditionalComment}
              style={{
                borderWidth: 1,
                borderColor: COLORS['french-vanilla'][300],
                borderRadius: 12,
                paddingBottom: 16,
                paddingTop: 16,
                paddingHorizontal: 24,
                fontFamily: FONTS.LSTH_REGULAR,
                height: 120,
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.LSTH_REGULAR,
                fontSize: 10,
                color: COLORS['french-vanilla'][500],
                position: 'absolute',
                bottom: 12,
                right: 12,
              }}
            >
              / 200
            </Text>
          </View>
        </View>

        <HorizontalDivider />

        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            {t('reviews.images')}
          </Text>

          {selectedImages.length > 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderWidth: 1,
                borderRadius: 12,
                borderStyle: 'dashed',
                borderColor: COLORS['french-vanilla'][300],
                marginBottom: 8,
              }}
            >
              {selectedImages.map((image, index) => {
                return (
                  <View
                    key={`selected-image-${index}`}
                    style={{
                      borderBottomColor: COLORS.soap[100],
                      borderBottomWidth: 1,
                      paddingVertical: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        gap: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.LSTH_BOLD,
                            fontSize: 14,
                          }}
                        >
                          {image.fileName || 'Untitled'}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => {
                        setSelectedImages((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }}
                    >
                      <MaterialIcons
                        name="remove"
                        size={24}
                        color={COLORS['french-vanilla'][300]}
                      />
                    </Pressable>
                  </View>
                )
              })}
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  paddingVertical: 12,
                }}
                onPress={handlePickImage}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 12,
                    color: COLORS['french-vanilla'][500],
                    flex: 1,
                  }}
                >
                  {t('reviews.add_more_images') || 'Add more images'}
                </Text>
                <MaterialIcons
                  name="add"
                  size={24}
                  color={COLORS['french-vanilla'][300]}
                />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                height: 72,
                borderWidth: 1,
                borderRadius: 12,
                borderStyle: 'dashed',
                borderColor: COLORS['french-vanilla'][300],
                backgroundColor: COLORS.soap[100],
                marginBottom: 8,
              }}
              onPress={handlePickImage}
            >
              <MaterialIcons
                name="image"
                size={24}
                color={COLORS['french-vanilla'][500]}
              />
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 12,
                  color: COLORS.info[400],
                }}
              >
                {t('reviews.upload_images') || 'Upload images'}
              </Text>
            </Pressable>
          )}
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 10,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t('reviews.images_limit_description')}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <Button label={t('reviews.submit_review')} onPress={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Page
