import { Stack, useNavigation, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { StackActions } from '@react-navigation/native'

import Button from '~/components/Button'
import { WGInputLink } from '~/components/form/PressableInputLink'
import { WGTextInput } from '~/components/form/TextInput'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { RegistrationForm } from '~/const/register'
import { useAuth } from '~/context/useAuth'
import { useStoreon } from '~/context/useStoreon'
import { GlobalStyle } from '~/styles'

function Page() {
  const navigation = useNavigation()
  const router = useRouter()
  const { register } = useAuth()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const { register: registerState, dispatch } = useStoreon('register')

  const handleRegiser = async () => {
    console.log(registerState)

    try {
      await register({
        username: registerState.username,
        firstname: registerState.firstname,
        lastname: registerState.lastname,
        email: registerState.email,
        password: registerState.password,
        metadata: {
          impairmentLevel: registerState.impairmentLevel,
          equipment: registerState.equipment,
        },
      })

      navigation.dispatch(StackActions.popToTop())
      router.replace('/')
      dispatch('register/reset')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAwareScrollView
      style={[
        GlobalStyle.container,
        {
          paddingHorizontal: 16,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <View
        style={{
          paddingTop: insets.top + 44 + 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 32,
              marginBottom: 12,
            }}
          >
            {t('auth.register.register_title')}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 16,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t('auth.register.register_description')}
          </Text>
        </View>

        <View
          style={{
            marginTop: 32,
            gap: 24,
          }}
        >
          {Object.entries(RegistrationForm).map(([key, value]) => {
            if (value.type === 'link') {
              return (
                <WGInputLink
                  key={`register-${key}`}
                  name={value.name}
                  label={value.label}
                  value={
                    registerState && registerState[key]
                      ? `${value.valuePrefix}${registerState[key]}`
                      : ''
                  }
                  placeholder={value.placeholder}
                  href={`/auth/register${value.href}`}
                />
              )
            }

            return (
              <WGTextInput
                key={`register-${key}`}
                name={value.name}
                label={value.label}
                value={registerState?.[key]}
                placeholder={t(value.placeholder || '') || ''}
                keyboardType={value.keyboardType}
                textContentType={value.textContentType}
                secureTextEntry={value.secureTextEntry}
                onChange={(e) => {
                  dispatch('register/setField', {
                    [key]: e.nativeEvent.text,
                  })
                }}
              />
            )
          })}

          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 24,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                fontSize: 12,
                color: COLORS['french-vanilla'][500],
                textAlign: 'center',
              }}
            >
              {t('auth.register.consent_predescription')}
            </Text>
            <Pressable
              onPress={() => {
                router.push('/policy')
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  fontSize: 12,
                  color: COLORS.info[400],
                  textAlign: 'center',
                }}
              >
                {t('auth.register.consent')}
              </Text>
            </Pressable>
          </View>

          <Button
            label="auth.register.register_button"
            onPress={handleRegiser}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Page
