import { BadRequestException, Injectable } from '@nestjs/common'
import { SupabaseService } from './supabase.service'
import { PrismaService } from '@common/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { SeedService } from 'prisma/seed'

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService,
    private seed: SeedService,
  ) {}

  async register(dto: RegisterDto): Promise<Record<string, string>> {
    const { name, email, password } = dto

    const { data, error } = await this.supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      password,
    })

    if (error) {
      console.error(error.message)
      throw new BadRequestException(error.message)
    }

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
  }
}
