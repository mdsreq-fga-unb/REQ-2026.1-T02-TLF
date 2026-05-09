import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { User } from '@supabase/supabase-js'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (property: keyof User | undefined, ctx: ExecutionContext): User | User[keyof User] => {
    const user = ctx.switchToHttp().getRequest<Request>().authUser
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado')
    }
    if (property !== undefined) {
      return user[property]
    }
    return user
  },
)
