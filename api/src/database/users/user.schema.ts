import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { genSaltSync, hashSync } from 'bcrypt'
import { HydratedDocument, Types } from 'mongoose'

import { ROLES } from '~/const/userRoles'
import { Media, MediaDocument } from '../media/media.schema'
import { UserBadge, UserBadgeObject } from '../object/UserBadgeObject'
import type { UserMetadata } from '../object/UserMetadataObject'
import { UserMetadataObject } from '../object/UserMetadataObject'
import { Timestamp, TimestampConfig } from '../utils/timestamp'

@Schema({ collection: 'users', timestamps: TimestampConfig })
export class User {
  @Prop({ type: Types.ObjectId, ref: Media.name })
  profileImage?: MediaDocument

  @Prop()
  firstname: string

  @Prop()
  lastname: string

  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  email: string

  @Prop(Date)
  birthdate?: Date

  @Prop({ type: String, enum: Object.values(ROLES), default: ROLES.USER })
  role: string

  @Prop({ type: UserMetadataObject })
  metadata?: UserMetadata

  @Prop({ type: [UserBadgeObject] })
  badges?: UserBadge[]
}

export type UserDocument = HydratedDocument<User, Timestamp>

const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre<UserDocument>('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, genSaltSync())
  }

  next()
})

export { UserSchema }
