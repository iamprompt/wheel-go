import { createRefToSave } from '~/utils/factory'
import {
  Facility as FacilityDB,
  FacilityDocument,
} from '~/database/facility/facility.schema'
import { LocationFactory } from '../object/factory/location.factory'
import { PlaceFactory } from '../place/place.factory'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { Facility } from './facility.schema'

type ReturnFacilityOrArray<
  T extends FacilityDocument | FacilityDocument[] | undefined | null,
> = T extends FacilityDocument[]
  ? Facility[]
  : T extends FacilityDocument
  ? Facility
  : undefined

export class FacilityFactory {
  static createFromDatabase<
    T extends FacilityDocument | FacilityDocument[] | undefined | null,
  >(data: T, _lang = 'th'): ReturnFacilityOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnFacilityOrArray<T>>(
        data.map((d) => FacilityFactory.createFromDatabase(d))
      )
    }

    return <ReturnFacilityOrArray<T>>{
      id: data._id.toString(),
      type: data.type,
      parent: PlaceFactory.createFromDatabase(data.parent),
      detail: data.detail,
      location: LocationFactory.createFromDatabase(data.location),
      metadata: data.metadata,
      concern: data.concern,
      isWarning: data.isWarning,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  static createToSave(data: CreateFacilityInput): FacilityDB {
    return {
      type: data.type,
      // @ts-expect-error Only ObjectId is needed
      parent: createRefToSave(data.parent),
      detail: data.detail,
      location: LocationFactory.createToSave(data.location),
      concern: data.concern,
      isWarning: data.isWarning,
      metadata: data.metadata,
      status: data.status,
    }
  }
}
