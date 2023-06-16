import { Image } from 'expo-image'
import { Text, View } from 'react-native'

import { chunk } from '~/utils/array'
import { format, FormatEnum } from '~/utils/dayjs'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FACILITIES } from '~/const/facility'
import { FacilityRatingTag } from '~/const/reviews'
import { AccessibilityRatingOverall } from './AccessibilityRatingOverall'
import { AccessibilityRatingTag } from './AccessibilityRatingTag'
import { Tag } from './common/Tag'
import { ReviewOfficialComment } from './ReviewOfficialComment'

interface ReviewItemProps {
  reviewer: string
  date: string
  overallRating: number
  additionalComment?: string
  officialComment?: Parameters<typeof ReviewOfficialComment>[0]
  facilityRatings?: {
    [key in keyof typeof FACILITIES]?: number
  }
  facilityTags?: string[]
  images?: {
    id: string
    url: string
  }[]
}

export function ReviewItem({
  reviewer,
  date,
  overallRating = 0,
  facilityRatings,
  facilityTags,
  officialComment,
  additionalComment,
  images = [],
}: ReviewItemProps) {
  return (
    <View
      style={{
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 12,
          }}
        >
          {reviewer}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {format(date, [FormatEnum.DATE, FormatEnum.TIME])}
        </Text>
      </View>
      <AccessibilityRatingOverall rating={overallRating} />
      {facilityRatings ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {Object.keys(FACILITIES).map((facility) => {
            return (
              <AccessibilityRatingTag
                key={facility}
                type={facility as keyof typeof FACILITIES}
                rating={
                  facilityRatings[facility as keyof typeof FACILITIES] || 0
                }
              />
            )
          })}
        </View>
      ) : null}
      {facilityTags ? (
        <>
          {facilityTags.length !== 0 ? (
            <View
              style={{
                gap: 8,
              }}
            >
              {chunk(facilityTags, 2).map((row, i) => {
                return (
                  <View
                    key={`facility-tag-${i}`}
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {row.map((item, index) => {
                      const tag = FacilityRatingTag[item]
                      if (!tag) {
                        return (
                          <View
                            style={{
                              flex: 1,
                              padding: 1,
                            }}
                          />
                        )
                      }

                      return (
                        <Tag
                          key={`tag-${i}-${index}`}
                          label={tag}
                          fullWidth
                          height={28}
                          textColor={COLORS.magenta[500]}
                          textWeight="normal"
                        />
                      )
                    })}
                  </View>
                )
              })}
            </View>
          ) : null}
        </>
      ) : null}
      <View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {additionalComment}
        </Text>
      </View>
      {images.length ? (
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          {images.map(({ id, url }) => {
            return (
              <Image
                key={id}
                source={url}
                style={{
                  flex: 1,
                  height: 96,
                  borderRadius: 8,
                  borderColor: COLORS['french-vanilla'][500],
                  borderWidth: 1,
                  aspectRatio: 4 / 3,
                }}
              />
            )
          })}
        </View>
      ) : null}
      {officialComment ? <ReviewOfficialComment {...officialComment} /> : null}
    </View>
  )
}
