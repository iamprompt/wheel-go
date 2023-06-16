import type { ComponentProps, FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Switch, Text, View } from 'react-native'

import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { MapPreferences } from '~/const/mapPref'
import { usePreferences } from '~/context/usePreferences'
import Button, { ButtonVariant } from './Button'
import { Tag } from './common/Tag'
import { HorizontalDivider } from './HorizontalDivider'

interface MapPrefsModalProps {
  onClose: () => void
  onAction?: () => void
}

export const MapPrefsModal: FC<MapPrefsModalProps> = ({ onClose }) => {
  const { mapViewPreferences, setMapViewPreferences } = usePreferences()
  const { t } = useTranslation()

  const MapPrefsKey = useMemo(() => {
    return {
      conditions: MapPreferences[0].items.map((item) => item.key),
      places: MapPreferences[1].items.map((item) => item.key),
    }
  }, [MapPreferences])

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({
    conditions: mapViewPreferences.conditions,
    places: mapViewPreferences.places,
  })

  const isSelectAll = useMemo(() => {
    return (
      MapPrefsKey.conditions.every((key) =>
        selectedOptions.conditions.includes(key),
      ) &&
      MapPrefsKey.places.every((key) => selectedOptions.places.includes(key))
    )
  }, [selectedOptions])

  const handleSelectAll = (value: boolean) => {
    if (value) {
      setSelectedOptions({
        conditions: MapPrefsKey.conditions,
        places: MapPrefsKey.places,
      })
    } else {
      setSelectedOptions({
        conditions: [],
        places: [],
      })
    }
  }

  const handleSave = () => {
    setMapViewPreferences({
      places: selectedOptions.places,
      conditions: selectedOptions.conditions,
    })
    onClose()
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 512,
        gap: 24,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {t('map_prefs_modal.title')}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
            textAlign: 'center',
            color: COLORS['french-vanilla'][500],
          }}
        >
          {t('map_prefs_modal.description')}
        </Text>
      </View>
      <HorizontalDivider />
      <View
        style={{
          gap: 24,
        }}
      >
        <View
          style={{
            gap: 24,
          }}
        >
          {MapPreferences.map((pref) => {
            return (
              <View key={`map-pref-${pref.name}`}>
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 14,
                  }}
                >
                  {t(pref.label)}
                </Text>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginTop: 12,
                  }}
                >
                  {pref.items?.map(({ key, icon, label, color }) => {
                    const isSelected = selectedOptions[pref.name].includes(key)

                    return (
                      <Pressable
                        key={`map-prefs-place-type-${key}`}
                        onPress={() => {
                          if (isSelected) {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [pref.name]: prev[pref.name].filter(
                                (type) => type !== key,
                              ),
                            }))
                          } else {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [pref.name]: [...prev[pref.name], key],
                            }))
                          }
                        }}
                      >
                        <Tag
                          label={label}
                          height={32}
                          icon={icon as ComponentProps<typeof Tag>['icon']}
                          iconPosition="left"
                          iconSize={24}
                          textColor={
                            isSelected ? color : COLORS['french-vanilla'][300]
                          }
                        />
                      </Pressable>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 12,
              color: COLORS['french-vanilla'][500],
            }}
          >
            {t('map_prefs_modal.show_all')}
          </Text>
          <Switch
            value={isSelectAll}
            onValueChange={(value) => handleSelectAll(value)}
            trackColor={{
              false: COLORS['french-vanilla'][200],
              true: COLORS.magenta[500],
            }}
            style={{
              transform: [{ scaleX: 0.774 }, { scaleY: 0.774 }],
            }}
          />
        </View>
      </View>
      <HorizontalDivider />
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Button
          label={t('button.cancel')}
          variant={ButtonVariant.Secondary}
          onPress={onClose}
          fullWidth
        />
        <Button label={t('button.confirm')} onPress={handleSave} fullWidth />
      </View>
    </View>
  )
}
