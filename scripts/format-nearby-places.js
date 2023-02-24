const { promises: fs } = require('fs')
const path = require('path')
const places = require('../data/nearby-places.json')

const formattedPlaces = places.map((place) => {
  const { name, geometry, vicinity } = place
  return {
    name,
    location: geometry.location,
    vicinity,
  }
})

fs.writeFile(
  path.resolve(process.cwd(), 'data', 'nearby-places-formatted.json'),
  JSON.stringify(formattedPlaces, null, 2)
)
