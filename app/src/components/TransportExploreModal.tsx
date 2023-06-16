import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { Accessibility_Status, useGetPlaceByIdQuery } from '~/generated-types'
import Button, { ButtonVariant } from './Button'
import { Tag } from './common/Tag'
import { HorizontalDivider } from './HorizontalDivider'

interface TransportExploreModalProps {
  onClose: () => void
  placeId: string
}

export function TransportExploreModal({
  onClose,
  placeId,
}: TransportExploreModalProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const { data } = useGetPlaceByIdQuery({
    variables: {
      id: placeId,
    },
  })

  const isAccessible = useMemo(() => {
    return (
      data?.getPlaceById.metadata?.accessibility ===
      Accessibility_Status.Accessible
    )
  }, [data])

  const busLines = useMemo(() => {
    return (
      data?.getPlaceById.metadata?.busLines?.filter((line) => {
        return line !== null && line !== undefined && line !== ''
      }) || []
    )
  }, [data])

  const tramLines = useMemo(() => {
    return (
      data?.getPlaceById.metadata?.tramLines?.filter((line) => {
        return line !== null && line !== undefined && line !== ''
      }) || []
    )
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
              isAccessible
                ? require('~/assets/places/transport-accessible.png')
                : require('~/assets/places/transport-inaccessible.png')
            }
            style={{
              width: 200,
              height: 140,
            }}
          />
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              marginTop: 24,
              textAlign: 'center',
              color: isAccessible ? COLORS.success[400] : COLORS.error[500],
            }}
          >
            {t(
              isAccessible
                ? 'explore.transport_modal.accessible_label'
                : 'explore.transport_modal.inaccessible_label',
            )}
          </Text>
        </View>
        <HorizontalDivider />
        <View>
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {getDisplayTextFromCurrentLanguage(data?.getPlaceById.name || {})}
          </Text>
          <View>
            {busLines.length > 0 ? (
              <>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  {t('explore.transport_modal.bus_lines.title')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {busLines.map((line) => (
                    <Tag
                      key={`bus-${line}`}
                      label={line}
                      height={28}
                      textColor={COLORS.black}
                    />
                  ))}
                </View>
              </>
            ) : null}
            {tramLines.length > 0 ? (
              <>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  {t('explore.transport_modal.tram_lines.title')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {tramLines.map((line) => (
                    <Tag
                      key={`tram-${line}`}
                      label={t(
                        `explore.transport_modal.tram_lines.${line.toLowerCase()}`,
                      )}
                      height={28}
                      textColor={COLORS.black}
                    />
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </View>
        <HorizontalDivider />
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
