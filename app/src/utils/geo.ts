import { getDistance } from 'geolib'

import type { GetNearbyPlacesFromLocationQuery } from '~/graphql/gql/graphql'

export function getNearestPlaces(
  places: GetNearbyPlacesFromLocationQuery,
  options: { lat: number; lng: number; limit: number; exclude?: string[] },
) {
  const { lat, lng, limit } = options
  const placesWithDistance = places.Places?.docs
    ?.filter((place) => {
      return place?.geolocation?.length === 2
    })
    .map((place) => {
      const distance = getDistance(
        { latitude: lat, longitude: lng },
        { latitude: place!.geolocation![1], longitude: place!.geolocation![0] },
      )
      return { ...place, distance }
    })

  const sortedPlaces = placesWithDistance
    ?.sort((a, b) => a.distance - b.distance)
    .filter((place) => !options.exclude?.includes(place.id!))
  return sortedPlaces?.slice(0, limit)
}
