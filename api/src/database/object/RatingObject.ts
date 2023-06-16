export const RatingObject = {
  overall: { type: Number },
  ramp: { type: Number },
  assistance: { type: Number },
  elevator: { type: Number },
  parking: { type: Number },
  surface: { type: Number },
  toilet: { type: Number },
}

export interface Rating {
  overall?: number
  ramp?: number
  assistance?: number
  elevator?: number
  parking?: number
  surface?: number
  toilet?: number
}
