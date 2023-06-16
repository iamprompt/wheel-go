import { useNavigation, useRouter, useSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { ScrollView, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { StackActions } from '@react-navigation/native'

import { getDisplayTextFromCurrentLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { HeaderBackButton } from '~/components/HeaderBackButton'
import { PlaceItem } from '~/components/PlaceItem'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import {
  useGetRatingSummaryLazyQuery,
  useSearchPlacesQuery,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'

function Page() {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const navigation = useNavigation()

  const HeaderBackButtonElem = HeaderBackButton()

  const { q, field, ...params } = useSearchParams<{
    q?: string
    field: string
    from?: string
    to?: string
  }>()
  const [query, setQuery] = useState<string>(q || '')
  const [searchText, setSearchText] = useState<string>(q || '')

  const handleSearch = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    router.setParams({ q: e.nativeEvent.text })
    setQuery(e.nativeEvent.text)
  }

  const toExclude = field === 'from' ? params.to : params.from

  const { data } = useSearchPlacesQuery({
    variables: {
      query,
      exclude: toExclude ? [toExclude] : undefined,
    },
  })

  useEffect(() => {
    if (searchText) {
      router.setParams({ q: searchText })
      setQuery(searchText)
    }
  }, [searchText])

  const [getRatings, { data: ratingData }] = useGetRatingSummaryLazyQuery()

  const ratings = useMemo(() => {
    return ratingData?.getRatingSummaryByPlaceIds.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.overall,
      }),
      {} as Record<string, number>,
    )
  }, [data])

  useEffect(() => {
    if (data) {
      getRatings({
        variables: {
          placeIds: [...new Set(data.getPlaces.map((p) => p.id))],
        },
      })
    }
  }, [data])

  useEffect(() => {
    if (q) {
      setQuery(q)
      setSearchText(q)
    }
  }, [q])

  return (
    <View style={[GlobalStyle.container]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
          borderBottomColor: COLORS.soap[100],
          borderBottomWidth: 1,
          gap: 12,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          zIndex: 1,
        }}
      >
        <HeaderBackButtonElem />
        <View
          style={{
            flex: 1,
          }}
        >
          <TextInput
            style={{
              borderRadius: 12,
              flex: 1,
              borderColor: COLORS['french-vanilla'][300],
              borderWidth: 1,
              height: 48,
              paddingLeft: 48,
              paddingRight: 12,
              fontFamily: FONTS.LSTH_REGULAR,
              fontSize: 16,
            }}
            returnKeyType="search"
            placeholder={t('routes.search.placeholder') || ''}
            onSubmitEditing={handleSearch}
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons
            name="search"
            size={24}
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
            }}
          />
        </View>
      </View>

      {!query ? (
        <ScrollView
          style={{
            paddingTop: insets.top + 81,
          }}
        ></ScrollView>
      ) : (
        <ScrollView bounces={false}>
          <View
            style={{
              paddingTop: insets.top + 81,
              paddingBottom: insets.bottom,
              flex: 1,
            }}
          >
            {data?.getPlaces?.map((place) => {
              if (!place) {
                return null
              }

              return (
                <PlaceItem
                  key={`place-${place.id}`}
                  name={getDisplayTextFromCurrentLanguage({
                    th: place.name?.th,
                    en: place.name?.en,
                  })}
                  rating={ratings?.[place.id] || 0}
                  category={place.type!}
                  onPress={() => {
                    navigation.dispatch(StackActions.pop(1))
                    router.replace({
                      pathname: '/routes',
                      params: {
                        ...params,
                        [field!]: place.id,
                      },
                    })
                  }}
                  borderBottom
                />
              )
            })}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Page
