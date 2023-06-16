import { createRefToSave } from '~/utils/factory'
import { Place as PlaceDB, PlaceDocument } from '~/database/places/place.schema'
import { MediaFactory } from '../media/media.factory'
import { LocationFactory } from '../object/factory/location.factory'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { Place } from './place.schema'

type ReturnPlaceOrArray<
  T extends PlaceDocument | PlaceDocument[] | undefined | null,
> = T extends PlaceDocument[]
  ? Place[]
  : T extends PlaceDocument
  ? Place
  : undefined

export class PlaceFactory {
  static createFromDatabase<
    T extends PlaceDocument | PlaceDocument[] | undefined | null,
  >(place: T, lang = 'th'): ReturnPlaceOrArray<T> {
    if (!place) {
      return undefined
    }

    if (Array.isArray(place)) {
      return <ReturnPlaceOrArray<T>>(
        place.map((p) => PlaceFactory.createFromDatabase(p, lang))
      )
    }

    return <ReturnPlaceOrArray<T>>{
      id: place._id.toString(),
      type: place.type,
      name: place.name,
      address: place.address,
      location: LocationFactory.createFromDatabase(place.location),
      images: MediaFactory.createFromDatabase(place.images),
      internalCode: place.internalCode,
      metadata: place.metadata,
      status: place.status,
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
    }
  }

  static createToSave(data: CreatePlaceInput): PlaceDB {
    return {
      type: data.type,
      name: data.name,
      address: data.address,
      location: LocationFactory.createToSave(data.location),
      // @ts-expect-error Only ObjectId is required
      images: createRefToSave(data.images),
      internalCode: data.internalCode,
      metadata: data.metadata,
      status: data.status,
    }
  }
}
