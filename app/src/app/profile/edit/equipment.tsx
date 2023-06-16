import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { Equipments } from '~/const/equipment'
import { useStoreon } from '~/context/useStoreon'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()

  const { profileEdit, dispatch } = useStoreon('profileEdit')

  return (
    <ScrollView style={[GlobalStyle.container]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('profile.edit.equipment')!,
        }}
      />

      <View>
        {Object.entries(Equipments).map(([key, equipment], i) => (
          <Pressable
            key={`equipment-${equipment.label}`}
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
              dispatch('profileEdit/setField', {
                equipment: key,
              })
            }}
          >
            <Text style={{ fontFamily: FONTS.LSTH_BOLD, fontSize: 14 }}>
              {t(equipment.label)}
            </Text>
            <View>
              <MaterialIcons
                name={
                  profileEdit.equipment === key
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
