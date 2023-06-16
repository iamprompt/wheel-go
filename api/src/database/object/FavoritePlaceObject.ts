import { Schema } from 'mongoose'

import type { PlaceDocument } from '../places/place.schema'

export const FavoritePlaceObject = {
  place: { types: Schema.Types.ObjectId, ref: 'Place' },
  addedAt: { type: Date, default: Date.now },
}

export interface FavoritePlace {
  place: PlaceDocument
  addedAt: Date
}
