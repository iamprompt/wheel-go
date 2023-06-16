export const LocationObject = {
  type: { type: String, enum: ['Point'] },
  coordinates: { type: [Number], index: '2dsphere' },
}

export interface Location {
  type: 'Point'
  coordinates: [number, number]
}
