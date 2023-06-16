import { Image } from 'expo-image'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'

import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { ReactNativeFile } from 'apollo-upload-client'
import { toast } from 'burnt'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import { HeaderBackButton } from '~/components/HeaderBackButton'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { useAuth } from '~/context/useAuth'
import { useStoreon } from '~/context/useStoreon'
import {
  useGetMyProfileLazyQuery,
  useUpdateProfileMutation,
  useUploadMediaMutation,
} from '~/generated-types'
import { GlobalStyle } from '~/styles'
import { ProfileEditSection } from '../../../const/editSection'

interface ProfileForm {
  [key: string]: string | undefined
  firstname: string
  lastname: string
  email: string
  username: string
  impairmentLevel: string
  equipment: string
  profileImage: string
}

export default function Page() {
  const router = useRouter()
  const { t } = useTranslation()
  const { user } = useAuth()

  const { profileEdit, dispatch } = useStoreon('profileEdit')

  const [getProfile] = useGetMyProfileLazyQuery()

  const [updateProfile] = useUpdateProfileMutation({
    refetchQueries: ['GetMyProfile'],
  })
  const [uploadImage] = useUploadMediaMutation({
    refetchQueries: ['GetMyProfile'],
  })

  // Initialize profile edit session
  const initProfile = async () => {
    // If edit session is already started, do not fetch profile
    if (profileEdit) {
      return
    }

    const { data: profile } = await getProfile()
    if (profile) {
      const { me } = profile

      dispatch('profileEdit/setProfile', {
        firstname: me.firstname || '',
        lastname: me.lastname || '',
        email: me.email || '',
        username: me.username || '',
        impairmentLevel: me.metadata?.impairmentLevel || '',
        equipment: me.metadata?.equipment || '',
        profileImage: me.profileImage?.url || '',
      })
    }
  }

  const handleFormSubmit = async () => {
    try {
      const profile = {
        firstname: profileEdit?.firstname,
        lastname: profileEdit?.lastname,
        username: profileEdit?.username,
        metadata: {
          impairmentLevel: profileEdit?.impairmentLevel,
          equipment: profileEdit?.equipment,
        },
      }

      await updateProfile({
        variables: {
          input: profile,
        },
      })

      Keyboard.dismiss()

      toast({
        title: t('profile.edit.success'),
        haptic: 'success',
        preset: 'custom',
        duration: 3,
        icon: {
          ios: {
            name: 'person.2.fill',
            color: COLORS.magenta[500],
          },
        },
      })

      router.back()
      dispatch('profileEdit/reset')
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleProfileImageChange = async () => {
    const { assets, canceled } = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false,
    })

    if (!canceled) {
      const asset = assets[0]

      const image = new ReactNativeFile({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName || 'image.jpg',
      })

      try {
        const { data: uploadData } = await uploadImage({
          variables: {
            file: image,
          },
        })

        if (uploadData) {
          const { uploadMedia } = uploadData

          await updateProfile({
            variables: {
              input: {
                profileImage: uploadMedia.id,
              },
            },
          })

          dispatch('profileEdit/setField', {
            profileImage: uploadMedia.url || '',
          })

          toast({
            title: t('profile.edit.success'),
            haptic: 'success',
            preset: 'custom',
            duration: 3,
            icon: {
              ios: {
                name: 'person.2.fill',
                color: COLORS.magenta[500],
              },
            },
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  useEffect(() => {
    initProfile()
  }, [user])

  if (!user || !profileEdit) {
    return null
  }

  return (
    <KeyboardAwareScrollView
      style={[GlobalStyle.container, { flexDirection: 'column' }]}
    >
      <Stack.Screen
        options={{
          title: t('profile.edit.title') || '',
          headerShown: true,
          headerLeft: HeaderBackButton({
            onPress: () => {
              router.back()
              dispatch('profileEdit/reset')
            },
          }),
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  handleFormSubmit()
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    fontSize: 16,
                    color: COLORS.magenta[500],
                  }}
                >
                  {t('button.save')}
                </Text>
              </Pressable>
            )
          },
        }}
      />

      <View
        style={{
          paddingTop: 24,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 16,
            alignSelf: 'center',
          }}
        >
          <Image
            source={{
              uri: profileEdit.profileImage || '',
              width: 128,
              height: 128,
            }}
            style={{
              borderRadius: 64,
              width: 96,
              height: 96,
            }}
          />
          <Pressable
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              paddingHorizontal: 8,
              paddingVertical: 8,
              backgroundColor: COLORS.magenta[500],
              borderRadius: 96,
            }}
            onPress={handleProfileImageChange}
          >
            <MaterialIcons name="camera_alt" size={16} color={COLORS.white} />
          </Pressable>
        </View>

        <View>
          {ProfileEditSection.map((section, sectionIndex) => {
            return (
              <View
                key={`setting-sections-${sectionIndex}-${section.name}`}
                style={{
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.LSTH_BOLD,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: COLORS['french-vanilla'][500],
                  }}
                >
                  {t(section.label)}
                </Text>
                <View>
                  {section.items.map(({ editable = true, ...item }, index) => {
                    let value = profileEdit[item.key]
                    if (item.i18nPrefix && value) {
                      value = t(`${item.i18nPrefix}${value}`) || value
                    }

                    return (
                      <Pressable
                        key={`setting-sections-${sectionIndex}-${section.name}-item-${item.name}`}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderColor: COLORS.soap[100],
                          borderBottomWidth: 1,
                          borderTopWidth: index === 0 ? 1 : 0,
                          gap: 32,
                        }}
                        {...(item.href
                          ? {
                              onPress: () => {
                                router.push(`/profile/edit${item.href}`)
                              },
                            }
                          : {})}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.LSTH_BOLD,
                          }}
                        >
                          {t(item.label)}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                          }}
                        >
                          {item.href ? (
                            <>
                              <Text
                                style={{
                                  fontFamily: FONTS.LSTH_REGULAR,
                                  color: COLORS['french-vanilla'][500],
                                  fontSize: 14,
                                  flex: 1,
                                  textAlign: 'right',
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {value}
                              </Text>
                              <MaterialIcons
                                name="chevron_right"
                                size={24}
                                color={COLORS['french-vanilla'][300]}
                                style={{
                                  marginLeft: 12,
                                }}
                              />
                            </>
                          ) : (
                            <TextInput
                              style={{
                                fontFamily: FONTS.LSTH_REGULAR,
                                color: COLORS['french-vanilla'][500],
                                fontSize: 14,
                                flex: 1,
                                textAlign: 'right',
                              }}
                              value={profileEdit[item.key]}
                              onChange={(e) => {
                                dispatch('profileEdit/setField', {
                                  [item.key]: e.nativeEvent.text,
                                })
                              }}
                              autoCapitalize="none"
                              autoCorrect={false}
                              editable={editable}
                            />
                          )}
                        </View>
                      </Pressable>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
