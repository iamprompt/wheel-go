import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { Config } from '~/config/configuration'
import { UserRepository } from '~/database/users/user.service'
import { UserFactory } from '~/modules/user/user.factory'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Config['JWT_SECRET']>('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email)
    if (!user) {
      return new HttpException('Invalid token', 401)
    }

    return UserFactory.createFromDatabase(user)
  }
}
