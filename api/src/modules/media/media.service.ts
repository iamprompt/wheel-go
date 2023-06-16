import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { HttpException, Injectable, Logger } from '@nestjs/common'

import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'

import { MediaRepository } from '~/database/media/media.services'
import { MediaFactory } from './media.factory'
import { Media } from './media.schema'

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async find(): Promise<Media[]> {
    const media = await this.mediaRepository.find()
    return MediaFactory.createFromDatabase(media)
  }

  async findById(id: string): Promise<Media> {
    const media = await this.mediaRepository.findById(id)

    if (!media) {
      throw new HttpException(`Media with id ${id} not found`, 404)
    }

    return MediaFactory.createFromDatabase(media)
  }

  async upload(file: FileUpload): Promise<Media> {
    const { createReadStream, filename: originalFilename } = file

    const fileExt = originalFilename.split('.').pop()
    const filename = `${randomUUID()}.${fileExt}`
    Logger.log(`Uploading file: ${filename}`)

    // Rename the file to a unique name

    // Read the file into a buffer
    const stream = createReadStream()
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })

    const metadata = await sharp(buffer).metadata()
    const { width, height, format, size } = metadata

    // Write the file to the uploads directory
    await writeFile(join(__dirname, '../../../uploads', filename), buffer)

    const media = MediaFactory.createToSave(filename, {
      width,
      height,
      format,
      size,
    })

    const result = await this.mediaRepository.create(media)

    return MediaFactory.createFromDatabase(result)
  }
}
