import { Stack, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { RouteItem } from '~/components/RouteItem'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { useGetMyTracedRoutesQuery } from '~/generated-types'
import { GlobalStyle } from '~/styles'

export default function Page() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const router = useRouter()

  const { data } = useGetMyTracedRoutesQuery()

  const routes = useMemo(() => data?.getMyTracedRoutes || [], [data])

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />

      <View
        style={{
          marginTop: insets.top + 44 + 16,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              padding: 12,
              backgroundColor: COLORS.success[400],
              borderRadius: 35,
              width: 70,
              height: 70,
              borderColor: COLORS.white,
              borderWidth: 3,
              shadowColor: COLORS.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <MaterialIcons name="route" size={40} color={COLORS.white} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 20,
              color: COLORS.success[400],
            }}
          >
            {t('records.contributed_routes')}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 14,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {routes.length} {t('units.routes')}
          </Text>
        </View>
        <View
          style={{
            marginTop: 24,
          }}
        >
          {routes.map((route, i) => {
            if (!route) {
              return null
            }

            return (
              <RouteItem
                key={i}
                date={route.createdAt}
                onPress={() => {
                  router.push(`/records/routes/${route.id}`)
                }}
                borderTop={i === 0}
                borderBottom
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
