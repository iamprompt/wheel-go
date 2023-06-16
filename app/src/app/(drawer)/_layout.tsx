import { useRouter } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import type { DrawerContentComponentProps } from '@react-navigation/drawer'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { BrandGradient } from '~/components/BrandGradient'
import Button, { ButtonVariant } from '~/components/Button'
import { Modal } from '~/components/Modal'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { DrawerItems } from '~/const/drawer'
import { useAuth } from '~/context/useAuth'
import { useGetMyProfileLazyQuery } from '~/generated-types'

const WheelGoDrawer: FC<DrawerContentComponentProps> = (_props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, signout } = useAuth()

  const [getProfile, { data: userData }] = useGetMyProfileLazyQuery()

  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user])

  return (
    <SafeAreaView style={{ padding: 16, flex: 1 }}>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginBottom: 32,
        }}
      >
        <Image
          style={{ width: 140, height: 32 }}
          source={require('~/assets/wordmark-dark.png')}
        />
      </View>
      {!user ? (
        <View
          style={{
            marginVertical: 16,
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 12,
              height: 48,
            }}
            onPress={() => {
              router.push('/auth/login')
            }}
          >
            <BrandGradient
              style={{
                flex: 1,
                height: '100%',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingVertical: 12,
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 16,
                  color: COLORS.white,
                }}
              >
                {t('auth.login_to_wheelgo')}
              </Text>
              <MaterialIcons
                name="navigate_next"
                size={20}
                color={COLORS['french-vanilla'][100]}
              />
            </BrandGradient>
          </Pressable>
        </View>
      ) : null}
      {user && userData && userData.me ? (
        <View
          style={{
            paddingVertical: 16,
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            borderBottomColor: COLORS.soap[100],
            borderBottomWidth: 1,
            borderTopColor: COLORS.soap[100],
            borderTopWidth: 1,
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={{
                uri:
                  userData.me.profileImage?.url ||
                  'https://www.gravatar.com/avatar/?default=mp',
                width: 48,
                height: 48,
              }}
              style={{
                borderRadius: 24,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_REGULAR,
                fontSize: 14,
              }}
            >
              สวัสดี 👋,
            </Text>
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 20,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {userData.me.firstname} {userData.me.lastname}
            </Text>
          </View>
        </View>
      ) : null}
      <View
        style={{
          marginTop: 32,
          flex: 1,
        }}
      >
        {DrawerItems.map((item) => {
          const [isModalOpen, setIsModalOpen] = useState(false)

          const ModalElement = item.modal ? item.modal : null

          const IconElement = item.icon ? (
            <MaterialIcons
              name={item.icon}
              size={20}
              style={{ marginHorizontal: 8 }}
              color={item.iconColor ? item.iconColor : 'black'}
            />
          ) : null

          return (
            <View key={`drawer-item-${item.label}`}>
              <Pressable
                onPress={(_e) => {
                  if (item.href) {
                    router.push(item.href)
                  }

                  if (ModalElement) {
                    setIsModalOpen(true)
                  }
                }}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 16,
                  }}
                >
                  {t(item.label)}
                </Text>
                {IconElement}
              </Pressable>
              {ModalElement ? (
                <Modal
                  isVisible={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  modal={ModalElement}
                />
              ) : null}
            </View>
          )
        })}
      </View>
      {user ? (
        <View>
          <Button
            label="auth.logout"
            variant={ButtonVariant.Secondary}
            onPress={() => {
              signout()
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  )
}

function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEnabled: false,
      }}
      drawerContent={(props) => <WheelGoDrawer {...props} />}
    />
  )
}

export default DrawerLayout
