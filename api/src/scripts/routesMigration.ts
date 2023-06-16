import { readdir, readFile } from 'node:fs/promises'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { getPathLength } from 'geolib'
import { parse } from 'papaparse'

import { AppModule } from '~/app.module'
import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { RouteService } from '~/modules/route/route.service'

const ROUTES_DIRECTORY = './data/routes'

async function migrate() {
  const application = await NestFactory.createApplicationContext(AppModule)
  const routeService = application.get(RouteService)

  const MainRoutesDirectory = await readdir(ROUTES_DIRECTORY, {
    withFileTypes: true,
  })
  const RoutesFolder = MainRoutesDirectory.filter((file) =>
    file.isDirectory(),
  ).map((file) => file.name)

  for (const folderName of RoutesFolder) {
    Logger.log(`Import Routes CSV from ${folderName}`, 'RoutesMigration')

    const routesDirectory = await readdir(`${ROUTES_DIRECTORY}/${folderName}`, {
      withFileTypes: true,
    })

    const routeFiles = routesDirectory
      .filter((file) => file.isFile() && file.name.endsWith('.csv'))
      .map((file) => file.name)

    for (const fileName of routeFiles) {
      Logger.log(`Importing ${fileName}`, `RoutesMigration - ${folderName}`)

      const routeInternalCode = fileName.split('.')[0]

      const file = await readFile(
        `${ROUTES_DIRECTORY}/${folderName}/${fileName}`,
        'utf8',
      )
      const { data } = parse<[number, number]>(file, {
        transform: (value, _field) => {
          return Number.isNaN(Number(value)) ? value : Number(value)
        },
      })

      const routeCSV = data
        .filter((item) => item.length === 2)
        .map((item) => {
          return {
            lat: item[0].toString(),
            lng: item[1].toString(),
          }
        })

      const route = await routeService.create({
        type: ROUTE_TYPES.PRE_DEFINED,
        internalCode: routeInternalCode,
        paths: routeCSV,
        distance: getPathLength(routeCSV),
        status: STATUS.PUBLISHED,
      })

      Logger.log(
        `Imported ${fileName} - ${route.id}`,
        `RoutesMigration - ${folderName}`,
      )
    }
  }

  process.exit(0)
}

migrate()
