import * as Application from 'expo-application'
import * as Linking from 'expo-linking'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import Button, { ButtonVariant } from '~/components/Button'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { useAuth } from '~/context/useAuth'
import { usePreferences } from '~/context/usePreferences'
import { GlobalStyle } from '~/styles'

interface SettingItem {
  name: string
  label: string
  href?: string
  action?: () => void
  value?: string
}

interface SettingSection {
  name: string
  label: string
  items: SettingItem[]
}

export default function App() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { appLanguage } = usePreferences()
  const router = useRouter()

  const settingItems = useMemo<SettingSection[]>(() => {
    return [
      {
        name: 'general',
        label: 'settings.general',
        items: [
          {
            name: 'language',
            label: 'settings.language',
            href: '/settings/language',
            value: appLanguage === 'th' ? 'ไทย' : 'English',
          },
        ],
      },
      {
        name: 'privacy',
        label: 'settings.privacy',
        items: [
          {
            name: 'data-allowance',
            label: 'settings.data_allowance',
            action: async () => {
              await Linking.openSettings()
            },
          },
          {
            name: 'privacy-policy',
            label: 'settings.privacy_policy',
            href: '/policy',
          },
        ],
      },
      {
        name: 'about',
        label: 'settings.about',
        items: [
          {
            name: 'version',
            label: 'settings.version',
            value: `${Application.nativeApplicationVersion} (${Application.nativeBuildVersion})`,
          },
          {
            name: 'copyright',
            label: 'settings.copyright',
            value: 'settings.mahidol_university',
          },
        ],
      },
    ]
  }, [appLanguage])

  return (
    <ScrollView
      style={[
        GlobalStyle.container,
        {
          flexDirection: 'column',
        },
      ]}
    >
      <Stack.Screen
        options={{
          title: t('page.settings')!,
          headerShown: true,
        }}
      />
      <StatusBar style="auto" />

      {settingItems.map((section, sectionIndex) => {
        return (
          <View
            key={`setting-sections-${sectionIndex}-${section.name}`}
            style={{
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                paddingHorizontal: 16,
                paddingVertical: 12,
                color: COLORS['french-vanilla'][500],
              }}
            >
              {t(section.label)}
            </Text>
            <View>
              {section.items.map((item, index) => {
                return (
                  <Pressable
                    key={`setting-sections-${sectionIndex}-${section.name}-item-${item.name}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderColor: COLORS.soap[100],
                      borderBottomWidth: 1,
                      borderTopWidth: index === 0 ? 1 : 0,
                    }}
                    onPress={() => {
                      if (item.href) {
                        router.push(item.href)
                      } else if (item.action) {
                        item.action()
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_BOLD,
                      }}
                    >
                      {t(item.label)}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {item.value ? (
                        <Text
                          style={{
                            fontFamily: FONTS.LSTH_BOLD,
                            color: COLORS['french-vanilla'][500],
                          }}
                        >
                          {t(item.value)}
                        </Text>
                      ) : null}
                      {!!item.href || !!item.action ? (
                        <MaterialIcons
                          name="chevron_right"
                          size={24}
                          color={COLORS['french-vanilla'][300]}
                          style={{
                            marginLeft: 12,
                          }}
                        />
                      ) : null}
                    </View>
                  </Pressable>
                )
              })}
            </View>
          </View>
        )
      })}

      <View
        style={{
          marginTop: 12,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {t('settings.support_division')}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderColor: COLORS.soap[100],
              borderBottomWidth: 1,
              borderTopWidth: 1,
            }}
          >
            <Image
              source={require('~/assets/logo/faculty-of-ict.png')}
              style={{ height: 24, width: 127.5, marginHorizontal: 12 }}
            />
            <Image
              source={require('~/assets/logo/physical-system.png')}
              style={{ height: 24, width: 115, marginHorizontal: 12 }}
            />
            <Image
              source={require('~/assets/logo/mu-ics.png')}
              style={{ height: 24, width: 80, marginHorizontal: 12 }}
            />
          </View>
        </View>
      </View>

      {user ? (
        <View
          style={{
            padding: 16,
            marginTop: 32,
          }}
        >
          <Button
            label={t('settings.delete_account_cta')}
            variant={ButtonVariant.Secondary}
            onPress={() => {
              Alert.alert(t('settings.delete_account_cta')!)
            }}
          />
        </View>
      ) : null}
    </ScrollView>
  )
}
