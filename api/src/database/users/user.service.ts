import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ObjectId } from 'mongodb'
import type { Model } from 'mongoose'

import type { UserDocument } from './user.schema'
import { User } from './user.schema'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  UserPopulateOptions: Parameters<(typeof this.UserModel)['populate']>['0'] = [
    {
      path: 'metadata.favorites',
      populate: {
        path: 'place',
      },
    },
    {
      path: 'profileImage',
    },
    {
      path: 'badges.badge',
    },
  ]

  async find(): Promise<UserDocument[]> {
    return this.UserModel.find().populate(this.UserPopulateOptions).exec()
  }

  async findById(id: string): Promise<UserDocument> {
    return this.UserModel.findById(id).populate(this.UserPopulateOptions).exec()
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email })
      .populate(this.UserPopulateOptions)
      .exec()
  }

  async create(data: User) {
    const newUser = new this.UserModel(data)
    return (await newUser.save()).populate(this.UserPopulateOptions)
  }

  async update(id: string, data: Partial<User>): Promise<UserDocument> {
    const user = await this.UserModel.findById(id)
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const updateResult = await this.UserModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    })
      .populate(this.UserPopulateOptions)
      .exec()

    return updateResult
  }

  async addFavoritePlace(
    userId: string,
    placeId: string,
  ): Promise<UserDocument> {
    const user = await this.UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          'metadata.favorites': {
            place: new ObjectId(placeId),
          },
        },
      },
      {
        returnDocument: 'after',
      },
    ).populate(this.UserPopulateOptions)

    return user
  }

  async removeFavoritePlace(
    userId: string,
    placeId: string,
  ): Promise<UserDocument> {
    const user = await this.UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          'metadata.favorites': {
            place: new ObjectId(placeId),
          },
        },
      },
      {
        returnDocument: 'after',
      },
    ).populate(this.UserPopulateOptions)

    return user
  }

  async addBadge(userId: string, badgeId: string): Promise<UserDocument> {
    const user = await this.UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          badges: {
            badge: new ObjectId(badgeId),
            isSeen: false,
            timestamp: new Date(),
          },
        },
      },
      {
        returnDocument: 'after',
      },
    ).populate(this.UserPopulateOptions)

    return user
  }
}
