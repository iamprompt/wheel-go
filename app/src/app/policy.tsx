import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'

import { getDisplayLanguage } from '~/utils/i18n'
import FONTS from '~/styles/fonts'
import { Policy } from '~/const/policy'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()

  return (
    <ScrollView
      style={[
        GlobalStyle.container,
        {
          paddingHorizontal: 16,
          paddingVertical: 24,
        },
      ]}
    >
      <Stack.Screen
        options={{
          title: t('page.privacy_policy')!,
          headerShown: true,
        }}
      />

      <StatusBar style="auto" />

      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 24,
        }}
      >
        Privacy Policy
      </Text>

      <View
        style={{
          marginTop: 12,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
          }}
        >
          {Policy[getDisplayLanguage(['th', 'en'], 'th')]}
        </Text>
      </View>
    </ScrollView>
  )
}

export default Page
