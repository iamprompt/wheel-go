import { Location as LocationDB } from '~/database/object/LocationObject'
import { LocationInput } from '../dto/location.dto'
import { Location } from '../location.schema'

type ReturnLocationOrArray<
  T extends LocationDB | LocationDB[] | undefined | null,
> = T extends LocationDB[]
  ? Location[]
  : T extends LocationDB
  ? Location | undefined
  : undefined

type ReturnCreateLocationOrArray<
  T extends LocationInput | LocationInput[] | undefined | null,
> = T extends LocationInput[]
  ? LocationDB[]
  : T extends LocationInput
  ? LocationDB
  : undefined

export class LocationFactory {
  static createFromDatabase<
    T extends LocationDB | LocationDB[] | undefined | null,
  >(locations: T): ReturnLocationOrArray<T> {
    if (!locations || (!Array.isArray(locations) && !locations.coordinates)) {
      return undefined
    }

    if (Array.isArray(locations)) {
      return <ReturnLocationOrArray<T>>(
        locations
          .map((location) => LocationFactory.createFromDatabase(location))
          .filter(Boolean)
      )
    }

    return <ReturnLocationOrArray<T>>{
      lat: locations.coordinates[1],
      lng: locations.coordinates[0],
    }
  }

  static createToSave<
    T extends LocationInput | LocationInput[] | undefined | null,
  >(data: T): ReturnCreateLocationOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnCreateLocationOrArray<T>>(
        data.map((location) => LocationFactory.createToSave(location))
      )
    }

    const { lat, lng } = data

    const isInvalidLat = !lat || isNaN(Number(lat))
    const isInvalidLng = !lng || isNaN(Number(lng))

    if (isInvalidLat || isInvalidLng) {
      return undefined
    }

    return <ReturnCreateLocationOrArray<T>>{
      type: 'Point',
      coordinates: [Number(data.lng), Number(data.lat)],
    }
  }
}
