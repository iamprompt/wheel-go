import { Tabs } from 'expo-router'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

function HomeLayout() {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerTitleStyle: {
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 20,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: ComponentProps<typeof MaterialIcons>['name'] =
              'question_mark'

            if (route.name === 'index') {
              iconName = focused ? 'explore' : 'explore'
            } else if (route.name === 'records') {
              iconName = focused ? 'insert_drive_file' : 'insert_drive_file'
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person_outline'
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />
          },
          tabBarLabelStyle: {
            fontFamily: FONTS.LSTH_BOLD,
          },
          tabBarActiveTintColor: COLORS.magenta[600],
          tabBarInactiveTintColor: COLORS['french-vanilla'][300],
          tabBarStyle: {
            height: insets.bottom + 64,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('page.explore')!,
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: t('page.records')!,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('page.profile')!,
          }}
        />
      </Tabs>
    </>
  )
}

export default HomeLayout
