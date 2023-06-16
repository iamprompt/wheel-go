import { Image } from 'expo-image'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { Accessibility_Status, useGetPlaceByIdQuery } from '~/generated-types'
import Button, { ButtonVariant } from './Button'

interface CurbcutExploreModalProps {
  onClose: () => void
  placeId: string
}

export function CurbcutExploreModal({
  onClose,
  placeId,
}: CurbcutExploreModalProps) {
  const { t } = useTranslation()

  const { data } = useGetPlaceByIdQuery({
    variables: {
      id: placeId,
    },
  })

  const CURBCUT_STATUS = useMemo(() => {
    return data?.getPlaceById.metadata?.accessibility
  }, [data])

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        width: '100%',
        maxWidth: 512,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 12,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={
              CURBCUT_STATUS === Accessibility_Status.Normal
                ? require('~/assets/places/curbcut-accessible.png')
                : CURBCUT_STATUS === Accessibility_Status.NeedAssistance
                ? require('~/assets/places/curbcut-assistance.png')
                : require('~/assets/places/curbcut-broken.png')
            }
            style={{
              width: 180,
              height: 180,
            }}
          />
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              marginTop: 24,
              textAlign: 'center',
              color:
                CURBCUT_STATUS === Accessibility_Status.Normal
                  ? COLORS.success[400]
                  : CURBCUT_STATUS === Accessibility_Status.NeedAssistance
                  ? COLORS.warning[400]
                  : COLORS.error[500],
            }}
          >
            {t(
              CURBCUT_STATUS === Accessibility_Status.Normal
                ? 'explore.curbcut_modal.accessible_label'
                : CURBCUT_STATUS === Accessibility_Status.NeedAssistance
                ? 'explore.curbcut_modal.need_assistance_label'
                : 'explore.curbcut_modal.broken_label',
            )}
          </Text>
        </View>

        <View>
          <Button
            variant={ButtonVariant.Text}
            label={t('button.close')}
            textColor={COLORS.magenta[500]}
            onPress={() => {
              onClose()
            }}
          />
        </View>
      </View>
    </View>
  )
}
