import { UnauthorizedException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { ERROR_MESSAGES } from '~/const/errorMessage'
import { RegisterInput } from '../object/dto/register.dto'
import { AuthResponse } from './auth.schema'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS.code, {
        description: ERROR_MESSAGES.INVALID_CREDENTIALS.message,
      })
    }
    return this.authService.sign(user)
  }

  @Mutation(() => AuthResponse)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken)
  }

  @Mutation(() => AuthResponse)
  async register(@Args('data') data: RegisterInput) {
    const user = await this.authService.register(data)

    return this.authService.sign(user)
  }
}
