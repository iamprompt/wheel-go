import { Injectable } from '@nestjs/common'

import { PlaceRepository } from '~/database/places/place.services'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { GetPlacesInput } from './dto/getPlaces.dto'
import { PlaceFactory } from './place.factory'
import { Place } from './place.schema'

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async find(
    options: GetPlacesInput = {},
    lang = 'th',
    draft = false,
  ): Promise<Place[]> {
    const places = await this.placeRepository.find(options, draft)
    const formattedPlaces = PlaceFactory.createFromDatabase(places, lang)

    return formattedPlaces
  }

  async findById(id: string, lang = 'th', draft = false): Promise<Place> {
    const place = await this.placeRepository.findById(id, draft)
    const formattedPlace = PlaceFactory.createFromDatabase(place, lang)
    return formattedPlace
  }

  async create(data: CreatePlaceInput, lang = 'th'): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.create(place)
    return PlaceFactory.createFromDatabase(result, lang)
  }

  async update(
    id: string,
    data: CreatePlaceInput,
    lang = 'th',
  ): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.update(id, place)
    return PlaceFactory.createFromDatabase(result, lang)
  }

  async delete(id: string) {
    return this.placeRepository.delete(id)
  }
}
