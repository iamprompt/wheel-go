import { useNavigation } from 'expo-router'
import type { ComponentProps } from 'react'
import { Pressable } from 'react-native'

import type { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'

export function HeaderBackButton(props?: ComponentProps<typeof Pressable>) {
  return (_headerProps: Partial<HeaderBackButtonProps>) => {
    const navigation = useNavigation()

    return (
      <Pressable
        {...{
          onPress: (_e) => {
            navigation.canGoBack() && navigation.goBack()
          },
          ...props,
        }}
      >
        <MaterialIcons name="arrow_back_ios_new" size={24} />
      </Pressable>
    )
  }
}
