import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto'
import { SeedService } from 'prisma/seed'
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto'
import { LogoutResponseDto } from './dto/logout.dto'
import { RefreshRequestDto, RefreshResponseDto } from './dto/refresh.dto'

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService,
    private seed: SeedService,
  ) {}

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { name, email, password } = dto

    const { data, error } = await this.supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      password,
    })

    if (error) {
      console.error(error.message) //TODO:improve logging
      throw new BadRequestException(error.message)
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          id: data.user.id,
          email,
          name,
          createdAt: new Date(data.user.created_at),
        },
      })

      await this.seed.seedDefaultCategories(user.id)

      return { userId: user.id }
    } catch (error) {
      await this.supabase.auth.admin.deleteUser(data.user.id)
      console.error((error as Error).message)
      throw new BadRequestException((error as Error).message)
    }
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = dto

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error.message)
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: data.user.id,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    const accessToken = data.session?.access_token
    const refreshToken = data.session?.refresh_token

    if (!accessToken || !refreshToken) {
      throw new BadRequestException('Sessão retornada pelo provedor está incompleta')
    }

    return { accessToken, refreshToken }
  }

  async logout(accessToken: string): Promise<LogoutResponseDto> {
    const { error } = await this.supabase.auth.admin.signOut(accessToken)

    if (error) {
      console.error(error.message)
      throw new BadRequestException(error.message)
    }

    return { success: true }
  }

  async refreshToken(dto: RefreshRequestDto): Promise<RefreshResponseDto> {
    const { refreshToken: currentRefreshToken } = dto

    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: currentRefreshToken,
    })

    if (error) {
      console.error(error.message)
      throw new UnauthorizedException('Token de refresh inválido')
    }

    const accessToken = data.session?.access_token
    const refreshToken = data.session?.refresh_token

    if (!accessToken || !refreshToken) {
      throw new BadRequestException('Invalid refresh token')
    }

    return { accessToken, refreshToken }
  }
}
