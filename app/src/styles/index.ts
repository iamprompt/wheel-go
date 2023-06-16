import { StyleSheet } from 'react-native'

import COLORS from './colors'

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 1,
  },
})
