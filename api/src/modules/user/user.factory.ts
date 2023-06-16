import { createRefToSave } from '~/utils/factory'
import { User as UserDB, UserDocument } from '~/database/users/user.schema'
import { BadgeFactory } from '../badge/badge.factory'
import { MediaFactory } from '../media/media.factory'
import { PlaceFactory } from '../place/place.factory'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { User } from './user.schema'

type ReturnUserOrArray<
  T extends UserDocument | UserDocument[] | undefined | null,
> = T extends UserDocument[]
  ? User[]
  : T extends UserDocument
  ? User
  : undefined

export class UserFactory {
  static createFromDatabase<
    T extends UserDocument | UserDocument[] | undefined | null,
  >(user: T, lang = 'th'): ReturnUserOrArray<T> {
    if (!user) {
      return undefined
    }

    if (Array.isArray(user)) {
      return <ReturnUserOrArray<T>>(
        user.map((u) => UserFactory.createFromDatabase(u))
      )
    }

    return <ReturnUserOrArray<T>>{
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role,
      metadata: {
        impairmentLevel: user.metadata?.impairmentLevel,
        equipment: user.metadata?.equipment,
        favorites:
          user.metadata?.favorites.map((f) => ({
            addedAt: f.addedAt,
            place: PlaceFactory.createFromDatabase(f.place, lang),
          })) || [],
      },
      badges:
        user.badges?.map((badge) => ({
          badge: BadgeFactory.createFromDatabase(badge.badge),
          timestamp: badge.timestamp,
          isSeen: badge.isSeen,
        })) || [],
      profileImage: MediaFactory.createFromDatabase(user.profileImage),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static createToSave(
    user: Partial<CreateUserInput & UpdateUserInput>,
  ): UserDB {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email || undefined,
      role: user.role,
      password: user.password || undefined,
      // @ts-expect-error Only ObjectId is required
      profileImage: createRefToSave(user.profileImage),
      metadata: {
        ...user.metadata,
        // @ts-expect-error Only ObjectId is required
        favorites:
          user.metadata?.favorites?.map((f) => ({
            addedAt: f.addedAt,
            place: createRefToSave(f.place),
          })) || [],
      },
    }
  }
}
