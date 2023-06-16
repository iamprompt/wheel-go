import configuration from '~/config/configuration'
import { Media as MediaDB, MediaDocument } from '~/database/media/media.schema'
import { Media } from './media.schema'

type ReturnMediaOrArray<
  T extends MediaDocument | MediaDocument[] | undefined | null,
> = T extends MediaDocument[]
  ? Media[]
  : T extends MediaDocument
  ? Media
  : undefined

export class MediaFactory {
  static createFromDatabase<
    T extends MediaDocument | MediaDocument[] | undefined | null,
  >(data: T): ReturnMediaOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnMediaOrArray<T>>(
        data.map((d) => MediaFactory.createFromDatabase(d))
      )
    }

    return <ReturnMediaOrArray<T>>{
      id: data._id.toString(),
      filename: data.filename,
      filesize: data.filesize,
      height: data.height,
      mimetype: data.mimetype,
      url: new URL(
        data.path,
        configuration().SERVER_URL || 'http://localhost:3000',
      ).toString(),
      width: data.width,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  static createToSave(
    filename: string,
    {
      width,
      height,
      format,
      size,
    }: { width: number; height: number; format: string; size: number },
  ): MediaDB {
    return {
      filename,
      filesize: size,
      height,
      mimetype: `image/${format}`,
      path: `/uploads/${filename}`,
      width,
    }
  }
}
