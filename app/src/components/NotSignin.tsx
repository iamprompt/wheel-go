import { useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import Button from './Button'

export function NotSignedIn({ children }: { children?: ReactNode }) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 32,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        {t('auth.page_not_signed_in')}
      </Text>
      <Button
        label={t('auth.sign_in')}
        onPress={() => {
          router.push('/auth/login')
        }}
      />
      {children}
    </View>
  )
}
