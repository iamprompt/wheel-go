import { useFonts } from 'expo-font'

enum FONTS {
  LSTH_BOLD = 'LINESeedSansTH-Bold',
  LSTH_REGULAR = 'LINESeedSansTH-Regular',
  LSTH_THIN = 'LINESeedSansTH-Thin',
}

const fontSource = {
  'LINESeedSansTH-Bold': require('~/assets/fonts/LINESeedSansTH_A_Bd.otf'),
  'LINESeedSansTH-Regular': require('~/assets/fonts/LINESeedSansTH_A_Rg.otf'),
  'LINESeedSansTH-Thin': require('~/assets/fonts/LINESeedSansTH_A_Th.otf'),
} satisfies Record<FONTS, any>

export function loadFonts() {
  return useFonts(fontSource)
}

export default FONTS
