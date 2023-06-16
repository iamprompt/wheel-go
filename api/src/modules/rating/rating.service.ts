import { Injectable } from '@nestjs/common'

import { FACILITY_STATUS } from '~/const/facilityStatus'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { FacilityService } from '../facility/facility.service'
import { FacilityAvailability } from '../object/facilityAvailability.schema'
import { PlaceService } from '../place/place.service'
import { ReviewService } from '../review/review.service'
import { RatingSummary } from './rating.schema'

@Injectable()
export class RatingService {
  constructor(
    private readonly placeService: PlaceService,
    private readonly reviewService: ReviewService,
    private readonly facilityService: FacilityService,
  ) {}

  async getPlaceRating(id: string): Promise<RatingSummary> {
    const place = await this.placeService.findById(id)
    if (!place) {
      return null
    }

    const reviews = await this.reviewService.findByPlaceId(place.id)

    const reviewCount = reviews.length
    const totalRating = reviews.reduce(
      (acc, review) => {
        return Object.entries(review.rating).reduce((acc, [key, value]) => {
          if (key === 'overall') {
            acc.overall += value
          } else {
            acc.facilities[key.toUpperCase()] = acc.facilities[
              key.toUpperCase()
            ] || {
              status: FACILITY_STATUS.UNKNOWN,
              rating: 0,
            }

            acc.facilities[key.toUpperCase()].rating =
              acc.facilities[key.toUpperCase()].rating + value
          }
          return acc
        }, acc)
      },
      {
        overall: 0,
        facilities: {},
      } as {
        overall: number
        facilities: Record<string, FacilityAvailability>
      },
    )

    const facilities = await this.facilityService.findByPlaceId(place.id)

    const facilitiesStatus = facilities.reduce((acc, facility) => {
      acc[facility.type] = facility.isWarning
        ? FACILITY_STATUS.WARNING
        : acc[facility.type] || FACILITY_STATUS.AVAILABLE
      return acc
    }, {})

    const tags = reviews.reduce((acc, review) => {
      review.tags.forEach((tag) => {
        acc[tag] = acc[tag] || 0
        acc[tag]++
      })
      return acc
    }, {} as Record<string, number>)

    return {
      id: place.id,
      overall: totalRating.overall / reviewCount || 0,
      facilities: Object.keys(FACILITY_TYPES).reduce((acc, key) => {
        if (
          key === FACILITY_TYPES.SURFACE &&
          facilitiesStatus[key] === undefined
        ) {
          acc[key] = {
            status: FACILITY_STATUS.AVAILABLE,
            rating: totalRating.facilities[key]?.rating / reviewCount || 0,
          }

          return acc
        }

        acc[key] = {
          status: facilitiesStatus[key] || FACILITY_STATUS.UNAVAILABLE,
          rating: totalRating.facilities[key]?.rating / reviewCount || 0,
        }
        return acc
      }, {}),
      tags: Object.entries(tags).map(([key, value]) => ({
        tag: key,
        count: value,
      })),
      reviewCount: reviewCount || 0,
    }
  }

  async getPlaceRatings(ids: string[]): Promise<RatingSummary[]> {
    return Promise.all(ids.map((id) => this.getPlaceRating(id)))
  }
}
