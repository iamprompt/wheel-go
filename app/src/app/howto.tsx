import { useNavigation, useRouter } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { StackActions } from '@react-navigation/native'

import { getDisplayLanguage } from '~/utils/i18n'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { HOW_TO } from '~/const/howto'
import { usePreferences } from '~/context/usePreferences'
import { GlobalStyle } from '~/styles'

const { width: screenWidth } = Dimensions.get('window')

function HowToPage({
  image,
  title,
  description,
  width,
  height,
}: {
  image: ImageSourcePropType
  title: string
  description: string
  width?: number
  height?: number
}) {
  return (
    <View
      style={{
        width: screenWidth,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={image}
        style={{
          width,
          height,
        }}
      />
      <View
        style={{
          marginTop: 32,
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            textAlign: 'center',
            fontSize: 24,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  )
}

function Page() {
  const router = useRouter()
  const { setTutorialShown } = usePreferences()
  const insets = useSafeAreaInsets()
  const scrollRef = useRef<ScrollView>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const navigation = useNavigation()

  const { i18n, t } = useTranslation()

  const howtoData = useMemo(() => {
    return HOW_TO[getDisplayLanguage(['th', 'en'], 'th')]
  }, [i18n.language])

  const noOfPages = useMemo(() => {
    return howtoData.length
  }, [i18n.language])

  const isLastPage = useMemo(() => {
    return pageIndex === noOfPages - 1
  }, [pageIndex, noOfPages])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent
    const { x } = contentOffset

    // Page Index
    const page = Math.round(x / screenWidth)

    setPageIndex(page)
  }

  return (
    <View
      style={[
        GlobalStyle.container,
        {
          flex: 1,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <View
        style={{
          marginTop: insets.top + 16,
          paddingHorizontal: 32,
          position: 'absolute',
          right: 0,
          zIndex: 1,
        }}
      >
        {isLastPage ? null : (
          <Pressable
            onPress={() => {
              scrollRef.current?.scrollToEnd()
              setPageIndex(noOfPages - 1)
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.LSTH_BOLD,
                color: COLORS['french-vanilla'][500],
                fontSize: 16,
              }}
            >
              {t('button.skip')}
            </Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={handleScroll}
      >
        {howtoData.map((item, index) => (
          <HowToPage
            key={`howto-${index}`}
            image={item.image}
            title={item.title}
            description={item.description}
            width={item.width}
            height={item.height}
          />
        ))}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: 72,
            height: 48,
          }}
        >
          {pageIndex === 0 ? null : (
            <Pressable
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (pageIndex === 0) {
                  console.log('Start')
                } else {
                  scrollRef.current?.scrollTo({
                    x: (pageIndex - 1) * screenWidth,
                    animated: true,
                  })
                  setPageIndex(pageIndex - 1)
                }
              }}
            >
              <MaterialIcons name="arrow_back_ios_new" size={24} />
            </Pressable>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: noOfPages }).map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === pageIndex
                      ? COLORS.magenta[500]
                      : COLORS['french-vanilla'][200],
                  marginHorizontal: 4,
                }}
              />
            )
          })}
        </View>
        <View
          style={{
            width: 72,
            height: 48,
          }}
        >
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              backgroundColor: COLORS.magenta[500],
            }}
            onPress={async () => {
              if (isLastPage) {
                setTutorialShown(true)
                navigation.dispatch(StackActions.popToTop())
                router.replace('/')
              } else {
                scrollRef.current?.scrollTo({
                  x: (pageIndex + 1) * screenWidth,
                  animated: true,
                })
                setPageIndex(pageIndex + 1)
              }
            }}
          >
            {isLastPage ? (
              <Text
                style={{
                  fontFamily: FONTS.LSTH_BOLD,
                  color: COLORS['french-vanilla'][100],
                  fontSize: 16,
                }}
              >
                {t('button.go')}
              </Text>
            ) : (
              <MaterialIcons
                name="arrow_forward_ios"
                size={24}
                color={COLORS['french-vanilla'][100]}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Page
