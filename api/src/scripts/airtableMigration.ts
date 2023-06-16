import { readFile } from 'node:fs/promises'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import axios from 'axios'
import { parse } from 'papaparse'

import { AppModule } from '~/app.module'
import { ACCESSIBILITY_STATUS } from '~/const/accessibilityStatus'
import { PLACE_TYPES } from '~/const/placeTypes'
import { STATUS } from '~/const/status'
import { FacilityService } from '~/modules/facility/facility.service'
import { MediaService } from '~/modules/media/media.service'
import { PlaceService } from '~/modules/place/place.service'

interface CurbCutRaw {
  id: string
  lat_lng: string
  status: string
}

interface TransportRaw {
  place_en: string
  place_th: string
  lat_lng: string
  status: string
  accessible_bus_line: string
  accessible_tram: string
}

interface PlaceRaw {
  place_en: string
  place_th: string
  place_category_en: string
  place_address_en: string
  place_address_th: string
  place_phone_number: string
  place_website_url: string
  place_image: string
  lat_lng: string
  place_code: string
}

interface FacilityRaw {
  place_en: string
  facility_en: string
  rise: string
  length: string
  facility_lat_lng: string
  detail_en: string
  detail_th: string
}

async function migrate() {
  const application = await NestFactory.createApplicationContext(AppModule)

  const placeService = application.get(PlaceService)
  const mediaService = application.get(MediaService)
  const facilityService = application.get(FacilityService)

  // Import Airtable CSV - Curb Cuts
  Logger.log('Importing Airtable CSV - Curb Cuts')
  const curbCutsRaw = await readFile('./data/curbcuts-raw.csv', 'utf8')
  const curbCuts = parse<CurbCutRaw>(curbCutsRaw, { header: true }).data
  Logger.log('Found', curbCuts.length, 'curb cuts')
  Logger.log('Example curb cut:', curbCuts[0])

  // Import Airtable CSV - Transports
  Logger.log('Importing Airtable CSV - Transports')
  const transportRaw = await readFile('./data/transports-raw.csv', 'utf8')
  const transports = parse<TransportRaw>(transportRaw, { header: true }).data
  Logger.log(`Found ${transports.length} transport`)
  Logger.log(`Example transport: ${transports[0]}`)

  Logger.log('Importing Airtable CSV - Places')
  const placesRaw = await readFile('./data/places-raw.csv', 'utf8')
  const places = parse<PlaceRaw>(placesRaw, { header: true }).data
  Logger.log(`Found ${places.length} places`)
  Logger.log(`Example place: ${places[0]}`)

  // Import Airtable CSV - Facilities
  Logger.log('Importing Airtable CSV - Facilities')
  const facilitiesRaw = await readFile('./data/facilities-raw.csv', 'utf8')
  const facilities = parse<FacilityRaw>(facilitiesRaw, { header: true }).data
  Logger.log(`Found ${facilities.length} facilities`)
  Logger.log(`Example facility: ${facilities[0]}`)

  Logger.log('Creating Curb Cuts in database')
  for (const [i, curbCut] of curbCuts.entries()) {
    Logger.log(`Creating curb cut ${i + 1} of ${curbCuts.length}`)
    const curbcutStatus =
      curbCut.status === 'Normal'
        ? ACCESSIBILITY_STATUS.NORMAL
        : curbCut.status === 'Broken'
        ? ACCESSIBILITY_STATUS.BROKEN
        : curbCut.status === 'Assistance'
        ? ACCESSIBILITY_STATUS.NEED_ASSISTANCE
        : undefined

    // Create new curb cut
    const newCurbCut = await placeService.create({
      type: PLACE_TYPES.CURBCUT,
      internalCode: curbCut.id,
      location: {
        lat: Number(curbCut.lat_lng.split(',')[0]).toString(),
        lng: Number(curbCut.lat_lng.split(',')[1]).toString(),
      },
      metadata: {
        accessibility: curbcutStatus,
      },
      status: STATUS.PUBLISHED,
    })

    Logger.log(
      `Created new curb cut: ${newCurbCut.internalCode} (${i + 1}/${
        curbCuts.length
      })`,
    )
  }

  Logger.log('Creating Transports in database')
  for (const [i, transport] of transports.entries()) {
    Logger.log(`Creating transport ${i + 1} of ${transports.length}`)
    const accessibilityStatus =
      transport.status === 'Accessible'
        ? ACCESSIBILITY_STATUS.ACCESSIBLE
        : transport.status === 'Inaccessible'
        ? ACCESSIBILITY_STATUS.INACCESSIBLE
        : undefined

    const newTransport = await placeService.create({
      type: PLACE_TYPES.TRANSPORT,
      name: {
        en: transport.place_en,
        th: transport.place_th,
      },
      location: {
        lat: Number(transport.lat_lng.split(',')[0]).toString(),
        lng: Number(transport.lat_lng.split(',')[1]).toString(),
      },
      metadata: {
        accessibility: accessibilityStatus,
        busLines: transport.accessible_bus_line.split(','),
        tramLines: transport.accessible_tram.split(','),
      },
      status: STATUS.PUBLISHED,
    })

    Logger.log(
      `Created new transport: ${newTransport.name} (${i + 1}/${
        transports.length
      })`,
    )
  }

  const placeIds = {}

  Logger.log('Creating Places in database')

  for (const [i, place] of places.entries()) {
    Logger.log(`Creating place ${i + 1} of ${places.length}`)
    const newPlaceImageRequest = place.place_image
      ? await axios.get(place.place_image, {
          responseType: 'stream',
        })
      : undefined

    const linkedMedia = newPlaceImageRequest
      ? await mediaService.upload({
          filename: `${place.place_en
            .replace(/[^a-z0-9]/gi, '_')
            .replace(/_+/g, '_')
            // remove trailing underscore
            .replace(/[_\-]$/, '')
            .toLowerCase()}.${
            newPlaceImageRequest.headers['content-type'].split('/')[1]
          }`,
          mimetype: newPlaceImageRequest.headers['content-type'],
          encoding: '',
          createReadStream: () => newPlaceImageRequest.data,
        })
      : undefined

    const newPlace = await placeService.create(
      {
        name: {
          th: place.place_th?.trim(),
          en: place.place_en?.trim(),
        },
        address: {
          th: place.place_address_th?.trim(),
          en: place.place_address_en?.trim(),
        },
        location:
          place.lat_lng && place.lat_lng !== ''
            ? {
                lat: Number(place.lat_lng.split(',')[0]).toString(),
                lng: Number(place.lat_lng.split(',')[1]).toString(),
              }
            : undefined,
        internalCode: place.place_code?.trim(),
        type: place.place_category_en?.toUpperCase() as any,
        images: linkedMedia ? [linkedMedia.id] : [],
        metadata: {
          phone: place.place_phone_number,
          website: place.place_website_url,
        },
        status: STATUS.PUBLISHED,
      },
      'en',
    )

    Logger.log(
      `Created new place: ${newPlace.name} (${i + 1}/${places.length})`,
    )

    placeIds[newPlace.name.en] = newPlace.id
  }

  Logger.log('Creating Facilities in database')
  for (const [i, facility] of facilities.entries()) {
    Logger.log(`Creating facility ${i + 1} of ${facilities.length}`)
    const newFacilityLocationCast = {
      lat: Number(facility.facility_lat_lng.split(',')[0]),
      lng: Number(facility.facility_lat_lng.split(',')[1]),
    }

    const newFacilityLocation = {
      lat: !isNaN(newFacilityLocationCast.lat)
        ? newFacilityLocationCast.lat.toString()
        : undefined,
      lng: !isNaN(newFacilityLocationCast.lng)
        ? newFacilityLocationCast.lng.toString()
        : undefined,
    }

    const newFacility = await facilityService.create({
      detail: {
        th: facility.detail_th,
        en: facility.detail_en,
      },
      location:
        newFacilityLocation.lat && newFacilityLocation.lng
          ? newFacilityLocation
          : undefined,
      parent: placeIds[facility.place_en.trim()],
      type: facility.facility_en.trim().toUpperCase() as any,
      metadata: {
        rise: facility.rise ? Number(facility.rise) : undefined,
        length: facility.length ? Number(facility.length) : undefined,
      },
      status: STATUS.PUBLISHED,
      isWarning: facility.facility_en === 'Surface',
    })
    Logger.log(
      `Created new facility: ${newFacility.id} (${i + 1}/${facilities.length})`,
    )
  }

  await application.close()
  process.exit(0)
}

migrate()
