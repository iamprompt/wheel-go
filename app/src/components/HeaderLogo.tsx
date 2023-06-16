import { Image, View } from 'react-native'

export function HeaderLogo() {
  return (
    <View>
      <Image
        style={{ width: 105, height: 24 }}
        source={require('~/assets/wordmark-dark.png')}
      />
    </View>
  )
}
