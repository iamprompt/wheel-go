import { Stack, useRouter } from 'expo-router'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '~/components/Button'
import { WGTextInputControl } from '~/components/form/TextInputControl'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { useAuth } from '~/context/useAuth'
import { GlobalStyle } from '~/styles'

function Page() {
  const router = useRouter()
  const { signin } = useAuth()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm()

  const onSignIn: SubmitHandler<FieldValues> = (props) => {
    signin(props.email, props.password)
  }

  return (
    <View
      style={[
        GlobalStyle.container,
        {
          paddingTop: insets.top + 44 + 16,
          paddingHorizontal: 16,
        },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 32,
            marginBottom: 12,
          }}
        >
          {t('auth.login_title')}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 16,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {t('auth.login_description')}
        </Text>
      </View>

      <View
        style={{
          marginTop: 32,
          gap: 24,
        }}
      >
        <WGTextInputControl
          control={control}
          name="email"
          label="auth.email"
          placeholder={t('auth.email_placeholder')!}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <WGTextInputControl
          control={control}
          name="password"
          label="auth.password"
          placeholder={t('auth.password_placeholder')!}
          secureTextEntry
          textContentType="password"
        />
        <Button label="auth.login" onPress={handleSubmit(onSignIn)} />
      </View>

      <View
        style={{
          flexDirection: 'row',
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
          }}
        >
          {t('auth.dont_have_account')}
        </Text>
        <Pressable
          onPress={() => {
            router.push('/auth/register')
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 12,
              color: COLORS.info[400],
            }}
          >
            {t('auth.register_cta')}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Page
