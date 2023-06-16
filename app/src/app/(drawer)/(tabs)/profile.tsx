import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { BadgeModal } from '~/components/BadgeModal'
import { ExpProgressBar } from '~/components/ExpProgressBar'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import { Modal } from '~/components/Modal'
import { NotSignedIn } from '~/components/NotSignin'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { SUMMARY_DETAILS } from '~/const/profile'
import { useAuth } from '~/context/useAuth'
import {
  useGetMyBadgesQuery,
  useGetMyExpQuery,
  useGetMyProfileQuery,
  useGetMyProfileSummaryQuery,
} from '~/generated-types'
import type { GetMyProfileSummaryQuery } from '~/generated-types'
import { GlobalStyle } from '~/styles'

export default function App() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()
  const { t } = useTranslation()

  const { data: profileData } = useGetMyProfileQuery()
  const { data: profileSummary } = useGetMyProfileSummaryQuery()
  const { data: expData } = useGetMyExpQuery({
    fetchPolicy: 'no-cache',
  })

  const { data: BadgeData } = useGetMyBadgesQuery()

  const badges = useMemo(() => BadgeData?.getMyBadges || [], [BadgeData])

  const router = useRouter()

  const [isBadgeModalVisible, setIsBadgeModalVisible] = useState(false)
  const [badgeToDisplay, setBadgeToDisplay] =
    useState<ComponentProps<typeof BadgeModal>['badge']>()

  if (!user || !profileData || (profileData && !profileData.me)) {
    return <NotSignedIn />
  }

  const { firstname, lastname, metadata, profileImage } = profileData.me

  return (
    <ScrollView
      style={[
        GlobalStyle.container,
        {
          paddingTop: insets.top + 16,
        },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <StatusBar style="auto" />

      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Image
            source={{
              uri: profileImage?.url || '',
              width: 128,
              height: 128,
            }}
            style={{
              borderRadius: 64,
              borderColor: COLORS.magenta[500],
              borderWidth: 4,
            }}
          />
          {expData?.getMyExperiencePoint.level ? (
            <View
              style={{
                position: 'absolute',
                bottom: -10,
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: COLORS.magenta[500],
                borderRadius: 12,
                borderColor: COLORS['french-vanilla'][300],
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  color: COLORS.white,
                  fontSize: 14,
                }}
              >
                Lvl.{expData?.getMyExperiencePoint.level}
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={{
            marginTop: 16,
            marginBottom: 8,
            textAlign: 'center',
            fontSize: 28,
            fontFamily: FONTS.LSTH_BOLD,
          }}
        >
          {firstname} {lastname}
        </Text>
        {metadata?.impairmentLevel ? (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 14,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t(`impairment_level.${metadata.impairmentLevel}`)}
          </Text>
        ) : null}
        <View
          style={{
            marginTop: 12,
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => {
              router.push('/profile/edit')
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 12,
                color: COLORS.magenta[500],
              }}
            >
              {t('profile.edit_profile')}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 32,
            marginBottom: 16,
            flexDirection: 'row',
            gap: 16,
            justifyContent: 'center',
          }}
        >
          {badges.map((badge, index) => {
            if (!badge) {
              return null
            }

            return (
              <Pressable
                key={index}
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  setBadgeToDisplay({
                    name: getDisplayTextFromCurrentLanguage({
                      en: badge.badge.name.en,
                      th: badge.badge.name.th,
                    }),
                    description: getDisplayTextFromCurrentLanguage({
                      en: badge.badge.description.en,
                      th: badge.badge.description.th,
                    }),
                    icon: badge.badge.icon || 'help-outline',
                    color: badge.badge.color || COLORS.magenta[500],
                    conditions:
                      badge.badge.conditions?.map((condition) => {
                        return {
                          name: getDisplayTextFromCurrentLanguage({
                            en: condition.name!.en,
                            th: condition.name!.th,
                          }),
                          description: getDisplayTextFromCurrentLanguage({
                            en: condition.description!.en,
                            th: condition.description!.th,
                          }),
                          icon: condition.icon || 'help-outline',
                          color: condition.color || COLORS.magenta[500],
                        }
                      }) || [],
                  })
                  setIsBadgeModalVisible(true)
                }}
              >
                <View
                  style={{
                    borderColor: badge.badge.color || COLORS.magenta[500],
                    borderWidth: 2,
                    borderRadius: 28,
                    padding: 8,
                    width: 52,
                    height: 52,
                    marginBottom: 8,
                  }}
                >
                  <MaterialIcons
                    name={
                      (badge.badge.icon as ComponentProps<
                        typeof MaterialIcons
                      >['name']) || 'help-outline'
                    }
                    size={32}
                    color={badge.badge.color || COLORS.magenta[500]}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 12,
                    width: 80,
                    textAlign: 'center',
                    color: badge.badge.color || COLORS.magenta[500],
                  }}
                >
                  {getDisplayTextFromCurrentLanguage({
                    en: badge.badge.name.en,
                    th: badge.badge.name.th,
                  })}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>
      <Modal
        modal={BadgeModal}
        isVisible={isBadgeModalVisible}
        onClose={() => setIsBadgeModalVisible(false)}
        badge={badgeToDisplay}
      />
      {expData?.getMyExperiencePoint ? (
        <>
          <HorizontalDivider />
          <ExpProgressBar
            currentExp={expData.getMyExperiencePoint.point}
            nextLevelExp={expData.getMyExperiencePoint.nextLevelPoint}
          />
        </>
      ) : null}
      <HorizontalDivider height={12} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 68 + 24,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {t('profile.my_summary')}
        </Text>
        {profileSummary ? (
          <View
            style={{
              gap: 16,
            }}
          >
            {SUMMARY_DETAILS.map(
              ({ label, icon, key, format = (val: string) => val, unit }) => {
                const value =
                  profileSummary.getMySummary[
                    key as keyof GetMyProfileSummaryQuery['getMySummary']
                  ]

                return (
                  <View
                    key={label}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        flex: 1,
                      }}
                    >
                      <MaterialIcons
                        name={icon}
                        size={24}
                        color={COLORS.magenta[500]}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.LSTH_BOLD,
                          fontSize: 14,
                          flex: 1,
                        }}
                      >
                        {t(label)}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: FONTS.LSTH_REGULAR,
                          fontSize: 14,
                          color: COLORS['french-vanilla'][500],
                        }}
                      >
                        {t(format(value) || '')}
                        {unit ? ` ${t(`units.${unit}`)}` : ''}
                      </Text>
                    </View>
                  </View>
                )
              },
            )}
          </View>
        ) : null}
      </View>
    </ScrollView>
  )
}
