import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { HeaderLogo } from '~/components/HeaderLogo'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import { ReviewHereButton } from '~/components/ReviewHereButton'
import { ReviewItem } from '~/components/ReviewItem'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FACILITIES } from '~/const/facility'
import { useAuth } from '~/context/useAuth'
import { useGetReviewsByPlaceIdQuery } from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { id: placeId } = useSearchParams<{ id: string }>()

  const { data } = useGetReviewsByPlaceIdQuery({
    variables: {
      placeId: placeId!,
    },
  })

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          title: t('places.all_reviews') || '',
          headerShown: true,
          headerRight: () =>
            user ? (
              <Pressable
                onPress={() => {
                  router.push(`/places/${placeId}/reviews/new`)
                }}
              >
                <MaterialIcons name="add" size={24} />
              </Pressable>
            ) : null,
        }}
      />

      {user ? (
        <>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 24,
            }}
          >
            <ReviewHereButton placeId={placeId!} />
          </View>

          <HorizontalDivider height={12} />
        </>
      ) : null}

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          paddingBottom: 24 + insets.bottom,
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

        {(data?.getReviewsByPlaceId?.length || 0) > 0 ? (
          <>
            {data?.getReviewsByPlaceId?.map((review) => {
              const {
                id,
                user,
                comment,
                rating,
                official,
                images,
                createdAt,
                tags,
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
      </View>
    </ScrollView>
  )
}

export default Page
