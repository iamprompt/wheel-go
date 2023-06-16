import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { VerticalDivider } from '~/components/VerticalDivider'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import {
  useGetPlaceByIdQuery,
  useSearchRoutesLazyQuery,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()
  const router = useRouter()

  const params = useSearchParams<{
    from?: string
    to?: string
  }>()

  const { data: placeOrigin } = useGetPlaceByIdQuery({
    variables: {
      id: params.from!,
    },
  })

  const { data: placeDestination } = useGetPlaceByIdQuery({
    variables: {
      id: params.to!,
    },
  })

  const [searchRoute, { data: availableRoutes }] = useSearchRoutesLazyQuery()

  useEffect(() => {
    if (params.from && params.to) {
      searchRoute({
        variables: {
          from: params.from,
          to: params.to,
        },
      })
    }
  }, [params.from, params.to])

  const originPlaceName = useMemo(() => {
    return getDisplayTextFromCurrentLanguage({
      en: placeOrigin?.getPlaceById?.name?.en,
      th: placeOrigin?.getPlaceById?.name?.th,
    })
  }, [placeOrigin])

  const destinationPlaceName = useMemo(() => {
    return getDisplayTextFromCurrentLanguage({
      en: placeDestination?.getPlaceById?.name?.en,
      th: placeDestination?.getPlaceById?.name?.th,
    })
  }, [placeDestination])

  return (
    <View style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('routes_search.title') || 'Routes Search',
        }}
      />

      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
          borderBottomColor: COLORS.soap[100],
          borderBottomWidth: 1,
          gap: 12,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <MaterialIcons name="circle" size={12} color={COLORS.black} />
          <Pressable
            style={{
              borderRadius: 12,
              flex: 1,
              borderColor: COLORS['french-vanilla'][300],
              borderWidth: 1,
              height: 48,
              paddingLeft: 80,
              paddingRight: 12,
              justifyContent: 'center',
            }}
            onPress={() => {
              router.push({
                pathname: '/routes/search',
                params: {
                  ...params,
                  field: 'from',
                  q: originPlaceName,
                },
              })
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_REGULAR,
                fontSize: 16,
                color: placeOrigin?.getPlaceById
                  ? COLORS.black
                  : COLORS['french-vanilla'][500],
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {originPlaceName ||
                t('routes_search.from_placeholder') ||
                'Where are you going from?'}
            </Text>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                justifyContent: 'center',
                marginLeft: 16,
                width: 60,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 16,
                  color: COLORS['french-vanilla'][500],
                }}
              >
                {t('routes_search.from') || 'From'}
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginVertical: -16,
            marginHorizontal: -6,
          }}
        >
          <MaterialIcons
            name="horizontal_rule"
            size={24}
            color={COLORS['french-vanilla'][300]}
            style={{
              transform: [{ rotate: '90deg' }],
            }}
          />
          <View
            style={{
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <MaterialIcons
            name="square"
            size={12}
            color={COLORS['fruit-punch'][400]}
          />
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={() => {
              router.push({
                pathname: '/routes/search',
                params: {
                  ...params,
                  field: 'to',
                  q: destinationPlaceName,
                },
              })
            }}
          >
            <View
              style={{
                borderRadius: 12,
                // flex: 1,
                borderColor: COLORS['french-vanilla'][300],
                borderWidth: 1,
                height: 48,
                paddingLeft: 80,
                paddingRight: 12,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_REGULAR,
                  fontSize: 16,
                  color: placeDestination?.getPlaceById
                    ? COLORS.black
                    : COLORS['french-vanilla'][500],
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {destinationPlaceName ||
                  t('routes_search.to_placeholder') ||
                  'Where are you going to?'}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  marginLeft: 16,
                  width: 60,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 16,
                    color: COLORS['french-vanilla'][500],
                  }}
                >
                  {t('routes_search.to') || 'To'}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView>
        {availableRoutes?.getRoutes?.map((route) => {
          if (!route) {
            return null
          }

          return (
            <Pressable
              key={route.id}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 24,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderColor: COLORS.soap[100],
                borderBottomWidth: 1,
              }}
              onPress={() => {
                router.push(`/routes/${route.id}`)
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <MaterialIcons
                  name="route"
                  size={32}
                  color={COLORS.success[400]}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 14,
                    }}
                  >
                    Route ID {route.id}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_REGULAR,
                        fontSize: 12,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      {route.distance} เมตร
                    </Text>
                    <VerticalDivider height={12} />
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_REGULAR,
                        fontSize: 12,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      5 นาที
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <MaterialIcons
                  name="chevron_right"
                  size={24}
                  color={COLORS['french-vanilla'][300]}
                />
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Page
