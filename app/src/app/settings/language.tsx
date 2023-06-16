import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { languageOptions } from '~/const/languageOptions'
import { usePreferences } from '~/context/usePreferences'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()
  const { appLanguage, setLanguage } = usePreferences()

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('settings.language')!,
        }}
      />

      <View>
        {languageOptions.map((option, i) => (
          <Pressable
            key={`language-option-${option.value}`}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderColor: COLORS.soap[100],
              borderBottomWidth: 1,
              borderTopWidth: i === 0 ? 1 : 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => {
              setLanguage(option.value)
            }}
          >
            <Text style={{ fontFamily: FONTS.LSTH_BOLD, fontSize: 14 }}>
              {option.label}
            </Text>
            <View>
              <MaterialIcons
                name={
                  appLanguage === option.value
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'
                }
                size={24}
                color={COLORS.magenta[500]}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

export default Page