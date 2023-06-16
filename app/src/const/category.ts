import { Place_Types } from '~/generated-types'

interface CategoryIcon {
  [key: string]: any
}

export const ListCategoryIcon = {
  [Place_Types.Building]: require('~/assets/places/building-icon.png'),
  [Place_Types.Transport]: require('~/assets/places/bus-stop-icon.png'),
  [Place_Types.Cafe]: require('~/assets/places/cafe-icon.png'),
  [Place_Types.Curbcut]: require('~/assets/places/curbcut-icon.png'),
  [Place_Types.Food]: require('~/assets/places/food-icon.png'),
  [Place_Types.Park]: require('~/assets/places/park-icon.png'),
  [Place_Types.Parking]: require('~/assets/places/parking-icon.png'),
  [Place_Types.Residence]: require('~/assets/places/residence-icon.png'),
  [Place_Types.Toilet]: require('~/assets/places/toilet-icon.png'),
  [Place_Types.Sport]: require('~/assets/places/sport-icon.png'),
} satisfies CategoryIcon
