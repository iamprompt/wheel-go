import { Stack, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'

import dayjs from 'dayjs'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { CategoryLabel } from '~/components/CategoryLabel'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import type { Place_Types } from '~/generated-types'
import { useGetAnnouncementsQuery } from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()
  const router = useRouter()

  const { data } = useGetAnnouncementsQuery()

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('page.announcements')!,
        }}
      />

      <View>
        {data?.getAnnouncements?.map((item, i) => {
          if (!item) {
            return null
          }

          return (
            <Pressable
              key={`announcement-${item.id}`}
              style={({ pressed: _pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 24,
                borderColor: COLORS.soap[100],
                borderTopWidth: i === 0 ? 1 : 0,
                borderBottomWidth: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 12,
              })}
              onPress={() => {
                router.push(`/announcements/${item.id}`)
              }}
            >
              <MaterialIcons
                name="campaign"
                size={24}
                color={COLORS.error[500]}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_BOLD,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {getDisplayTextFromCurrentLanguage({
                      th: item.title?.th,
                      en: item.title?.en,
                    })}
                  </Text>
                  {item.place ? (
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_REGULAR,
                        fontSize: 12,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      {getDisplayTextFromCurrentLanguage({
                        th: item.place?.name?.th,
                        en: item.place?.name?.en,
                      })}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 10,
                      color: COLORS['french-vanilla'][500],
                    }}
                  >
                    {dayjs(item.createdAt).format('DD MMMM YYYY')}
                  </Text>
                  <View
                    style={{
                      width: 1,
                      height: '100%',
                      backgroundColor: COLORS.soap[100],
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 10,
                      color: COLORS['french-vanilla'][500],
                    }}
                  >
                    {dayjs(item.createdAt).format('HH:mm')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  {item.tags?.map((tag, index) => {
                    return (
                      <CategoryLabel
                        key={`announcement-${item.id}-tag-${index}`}
                        name={tag as Place_Types}
                      />
                    )
                  })}
                </View>
              </View>
              <MaterialIcons
                name="arrow_forward_ios"
                size={24}
                color={COLORS['french-vanilla'][300]}
              />
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Page
