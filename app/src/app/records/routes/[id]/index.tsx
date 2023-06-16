import { Stack, useSearchParams } from 'expo-router'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import type MapView from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import dayjs from 'dayjs'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { VerticalDivider } from '~/components/VerticalDivider'
import { WGMapView } from '~/components/WGMapView'
import { WGPolyline } from '~/components/WGPolyline'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { useGetRouteByIdQuery } from '~/generated-types'

function Page() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const mapRef = useRef<MapView>(null)

  const { id } = useSearchParams<{ id: string }>()

  const { data } = useGetRouteByIdQuery({
    variables: {
      id: id!,
    },
  })

  const route = useMemo(() => data?.getRouteById || null, [data])

  const routePoints = useMemo(
    () =>
      route?.paths?.map(({ lat, lng }) => {
        return {
          latitude: lat,
          longitude: lng,
        }
      }) || [],
    [route],
  )

  useEffect(() => {
    if (routePoints.length > 0) {
      mapRef.current?.fitToCoordinates(routePoints, {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 250,
          left: 100,
        },
        animated: true,
      })
    }
  }, [routePoints])

  if (!id || !route) {
    return null
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <View
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <WGMapView
          ref={mapRef}
          mapElements={<WGPolyline coordinates={routePoints} />}
          showCurrentLocation
          routes={false}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 16,
            paddingTop: 28,
            paddingBottom: insets.bottom + 16,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <MaterialIcons name="route" size={24} color={COLORS.success[400]} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: FONTS.LSTH_BOLD,
              }}
            >
              {t('records.contributed_routes')}
            </Text>
          </View>

          <View
            style={{
              gap: 16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    color: COLORS['french-vanilla'][500],
                    width: 60,
                  }}
                >
                  {t('records.date')}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 14,
                  }}
                >
                  {dayjs(route.createdAt).format('DD MMMM YYYY')}
                </Text>
              </View>
              <VerticalDivider />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    color: COLORS['french-vanilla'][500],
                    width: 60,
                  }}
                >
                  {t('records.time')}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 14,
                  }}
                >
                  {dayjs(route.createdAt).format('HH:mm')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    color: COLORS['french-vanilla'][500],
                    width: 60,
                  }}
                >
                  {t('records.elapsed_time')}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 14,
                  }}
                >
                  {dayjs
                    .duration(route.duration || 0, 'seconds')
                    .format('HH:mm:ss')}
                </Text>
              </View>
              <VerticalDivider />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    color: COLORS['french-vanilla'][500],
                    width: 60,
                  }}
                >
                  {t('records.distance')}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_REGULAR,
                    fontSize: 14,
                  }}
                >
                  {route.distance || 0} {t('units.meters')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Page
