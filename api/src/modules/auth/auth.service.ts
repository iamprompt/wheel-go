import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { compare } from 'bcrypt'

import { Config } from '~/config/configuration'
import { ERROR_MESSAGES } from '~/const/errorMessage'
import { ROLES } from '~/const/userRoles'
import { UserRepository } from '~/database/users/user.service'
import { RegisterInput } from '../object/dto/register.dto'
import { UserFactory } from '../user/user.factory'
import { User } from '../user/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    if (user) {
      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_PASSWORD.code, {
          description: ERROR_MESSAGES.INVALID_PASSWORD.message,
        })
      }

      return UserFactory.createFromDatabase(user)
    }
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_EMAIL.code, {
      description: ERROR_MESSAGES.INVALID_EMAIL.message,
    })
  }

  async sign(user: User) {
    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: this.configService.get<Config['JWT_SECRET']>('JWT_SECRET'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret:
          this.configService.get<Config['JWT_REFRESH_SECRET']>(
            'JWT_REFRESH_SECRET',
          ),
      }),
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get<Config['JWT_REFRESH_SECRET']>(
            'JWT_REFRESH_SECRET',
          ),
      })

      const user = await this.userRepository.findByEmail(payload.email)
      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND.code, {
          description: ERROR_MESSAGES.USER_NOT_FOUND.message,
        })
      }

      const formattedUser = UserFactory.createFromDatabase(user)
      return this.sign(formattedUser)
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN.code, {
        description: ERROR_MESSAGES.INVALID_REFRESH_TOKEN.message,
      })
    }
  }

  async register(data: RegisterInput) {
    const user = await this.userRepository.findByEmail(data.email)
    if (user) {
      throw new BadRequestException(ERROR_MESSAGES.EXISTING_EMAIL.code, {
        description: ERROR_MESSAGES.EXISTING_EMAIL.message,
      })
    }

    const newUser = await this.userRepository.create({
      ...data,
      role: ROLES.USER,
      metadata: {
        impairmentLevel: data.metadata?.impairmentLevel,
        equipment: data.metadata?.equipment,
        favorites: [],
      },
    })
    return UserFactory.createFromDatabase(newUser)
  }
}
