const path = require('path')
const { promises: fs } = require('fs')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
;(async () => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error('Missing GOOGLE_MAPS_API_KEY')
    process.exit(1)
  }

  const startingPoint = { lat: 13.7948, lng: 100.3219 }
  const radius = 1500 // in meters

  console.log('Fetching nearby places from Google Maps...')
  console.log('Starting point:', startingPoint)
  console.log('Radius:', radius)

  const places = []
  let next_page_token

  do {
    console.log('Fetching page...', next_page_token)
    const url = new URL(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    )
    url.searchParams.set('key', process.env.GOOGLE_MAPS_API_KEY)
    url.searchParams.set(
      'location',
      `${startingPoint.lat},${startingPoint.lng}`
    )
    url.searchParams.set('radius', radius)
    url.searchParams.set('language', 'th')
    next_page_token && url.searchParams.set('pagetoken', next_page_token)

    const result = await fetch(url).then((res) => {
      console.log(JSON.stringify(res.url))
      return res.json()
    })

    console.log(result)

    places.push(...result.results)
    console.log('Fetched places:', result.results.length)
    next_page_token = result.next_page_token
    console.log('has next page?', !!next_page_token)

    if (next_page_token) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  } while (next_page_token)

  console.log('Done fetching nearby places from Google Maps')
  console.log('Total places:', places.length)

  // Prepare directory if not exists
  console.log('Writing data to file...')
  await fs.mkdir(path.resolve(process.cwd(), 'data'), { recursive: true })

  fs.writeFile(
    path.resolve(process.cwd(), 'data', 'nearby-places.json'),
    JSON.stringify(places, null, 2)
  )
  console.log('Done writing data to file at data/nearby-places.json')
})()
