import { Image } from 'expo-image'
import { Marker } from 'react-native-maps'

import type { SURROUNDING_CONDITIONS } from '~/const/placeTypes'
import { PLACE_TYPES_META } from '~/const/placeTypes'
import type { Place_Types } from '~/generated-types'

export function WGMapMarker({
  coordinate: { lat, lng },
  onPress,
  type,
  isSelected,
}: {
  coordinate: {
    lat: number
    lng: number
  }
  onPress?: () => void
  type?: Place_Types | SURROUNDING_CONDITIONS
  isSelected?: boolean
}) {
  if (!lat || !lng) {
    return null
  }

  const typeMeta = type ? PLACE_TYPES_META[type] : PLACE_TYPES_META.RAMP

  const stateIcon = isSelected
    ? typeMeta.mapIcon.selected
    : typeMeta.mapIcon.default

  return (
    <Marker
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      onPress={onPress}
      anchor={stateIcon.centerOffset}
    >
      <Image source={stateIcon.file} style={stateIcon.size} />
    </Marker>
  )
}
