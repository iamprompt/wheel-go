import { createRefToSave } from '~/utils/factory'
import { Route as RouteDB, RouteDocument } from '~/database/routes/route.schema'
import { LocationFactory } from '../object/factory/location.factory'
import { PlaceFactory } from '../place/place.factory'
import { UserFactory } from '../user/user.factory'
import { CreateRouteInput } from './dto/createRoute.dto'
import { Route } from './route.schema'

type ReturnRouteOrArray<
  T extends RouteDocument | RouteDocument[] | undefined | null,
> = T extends RouteDocument[]
  ? Route[]
  : T extends RouteDocument
  ? Route
  : undefined

export class RouteFactory {
  static createFromDatabase<
    T extends RouteDocument | RouteDocument[] | undefined | null,
  >(data: T, lang = 'th'): ReturnRouteOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnRouteOrArray<T>>data.map((d) => this.createFromDatabase(d))
    }

    return <ReturnRouteOrArray<T>>{
      id: data._id.toString(),
      type: data.type,
      paths: LocationFactory.createFromDatabase(data.paths),
      internalCode: data.internalCode,
      origin: PlaceFactory.createFromDatabase(data.origin, lang),
      destination: PlaceFactory.createFromDatabase(data.destination, lang),
      user: UserFactory.createFromDatabase(data.user),
      distance: data.distance,
      duration: data.duration,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  static createToSave(data: CreateRouteInput): RouteDB {
    return {
      type: data.type,
      paths: LocationFactory.createToSave(data.paths),
      internalCode: data.internalCode,
      // @ts-expect-error Only ObjectId is required
      origin: createRefToSave(data.origin),
      // @ts-expect-error Only ObjectId is required
      destination: createRefToSave(data.destination),
      // @ts-expect-error Only ObjectId is required
      user: createRefToSave(data.user),
      distance: data.distance,
      duration: data.duration,
      status: data.status,
    }
  }
}
