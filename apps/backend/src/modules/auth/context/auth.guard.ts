import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { SupabaseService } from '@modules/supabase/supabase.service'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractBearerToken(request.headers.authorization)

    if (!token) {
      throw new UnauthorizedException('Token não fornecido')
    }

    const { data, error } = await this.supabase.auth.getUser(token)

    if (error || !data.user) {
      throw new UnauthorizedException('Token inválido ou expirado')
    }

    request.accessToken = token
    request.authUser = data.user
    return true
  }

  private extractBearerToken(authorization?: string): string | null {
    if (!authorization) {
      return null
    }
    const [bearer, token] = authorization.split(' ') ?? []
    return bearer === 'Bearer' ? token : null
  }
}
