import { MarkerF } from '@react-google-maps/api'

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
  onPress: () => void
  type?: Place_Types
  isSelected?: boolean
}) {
  if (!lat || !lng) {
    return null
  }

  const typeMeta = type ? PLACE_TYPES_META[type] : PLACE_TYPES_META.BUILDING

  const stateIcon = isSelected
    ? typeMeta.mapIcon.selected
    : typeMeta.mapIcon.default

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  // console.log(origin)
  return (
    <MarkerF
      position={{ lat, lng }}
      onClick={onPress}
      icon={{
        url: `${origin}/${stateIcon.file}`,
        scaledSize: new window.google.maps.Size(
          stateIcon.size.width,
          stateIcon.size.height,
        ),
        // anchor: new window.google.maps.Point(
        //   stateIcon.centerOffset.x,
        //   stateIcon.centerOffset.y
        // ),
      }}
    ></MarkerF>
  )
}
