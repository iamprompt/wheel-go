import { readFile } from 'node:fs/promises'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '~/app.module'
import { BadgeService } from '~/modules/badge/badge.service'
import { CreateBadgeInput } from '~/modules/badge/dto/createBadge.dto'

async function migrate() {
  const application = await NestFactory.createApplicationContext(AppModule)
  const badgeService = application.get(BadgeService)

  const badgesRaw = await readFile('./data/badges.json', 'utf8')
  const badges = JSON.parse(badgesRaw) as CreateBadgeInput[]

  for (const badge of badges) {
    const createdBadge = await badgeService.create(badge)

    if (!createdBadge) {
      Logger.error(`Error creating badge ${badge.name}`, 'BadgesMigration')
      continue
    }

    Logger.log(`Badge ${badge.name} created`, 'BadgesMigration')
  }

  process.exit(0)
}

migrate()
