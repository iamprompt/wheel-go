import { SetMetadata } from '@nestjs/common'

export function HasRoles(...roles: string[]) {
  return SetMetadata('roles', roles)
}
