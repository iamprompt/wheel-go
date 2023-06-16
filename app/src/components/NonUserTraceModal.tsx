import { useRouter } from 'expo-router'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import Button, { ButtonVariant } from './Button'

interface NonUserTraceModalProps {
  onClose: () => void
  onAction?: () => void
}

export const NonTraceUserModal: FC<NonUserTraceModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 512,
      }}
    >
      <View
        style={{
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          <MaterialIcons
            name="warning"
            size={32}
            color={COLORS.warning[400]}
            style={{
              marginRight: 12,
            }}
          />
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            {t('non_user_trace_modal.title')}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 14,
            textAlign: 'center',
            color: COLORS['french-vanilla'][500],
          }}
        >
          {t('non_user_trace_modal.description')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Button
          label={t('button.cancel')}
          variant={ButtonVariant.Text}
          onPress={onClose}
          fullWidth
        />
        <Button
          label={t('button.sign_in')}
          onPress={() => {
            router.push('/auth/login')
            onClose()
          }}
          fullWidth
        />
      </View>
    </View>
  )
}
