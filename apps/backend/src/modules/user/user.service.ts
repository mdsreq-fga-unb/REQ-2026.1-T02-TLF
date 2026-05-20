import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { GetUserRequestDto, GetUserResponseDto } from './dto/get.dto'
import { DeleteUserRequestDto, DeleteUserResponseDto } from './dto/delete.dto'
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dto/update.dto'
import { SupabaseService } from '@modules/supabase/supabase.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
  ) {}

  async getUser(dto: GetUserRequestDto): Promise<GetUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }

  async deleteUser(dto: DeleteUserRequestDto): Promise<DeleteUserResponseDto> {
    try {
      await this.prisma.user.delete({ where: { id: dto.userId } })
    } catch {
      throw new NotFoundException('Usuário não encontrado')
    }

    const { error } = await this.supabase.auth.admin.deleteUser(dto.userId)
    if (error) {
      console.error(error.message)
      throw new BadRequestException('Falha ao remover usuário do provedor de autenticação')
    }

    return { success: true }
  }

  async updateUser(dto: { userId: string } & UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
    const hasChanges =
      dto.name !== undefined || dto.email !== undefined || dto.password !== undefined
    if (!hasChanges) {
      throw new BadRequestException('Nenhum campo para atualizar foi fornecido')
    }

    if (dto.email !== undefined || dto.password !== undefined) {
      const { error } = await this.supabase.auth.admin.updateUserById(dto.userId, {
        ...(dto.email && { email: dto.email }),
        ...(dto.password && { password: dto.password }),
      })

      if (error) {
        console.error(error.message)
        throw new BadRequestException('Falha ao atualizar credenciais no provedor de autenticação')
      }
    }

    if (dto.name !== undefined || dto.email !== undefined) {
      try {
        await this.prisma.user.update({
          where: { id: dto.userId },
          data: {
            ...(dto.name && { name: dto.name }),
            ...(dto.email && { email: dto.email }),
          },
        })
      } catch {
        throw new NotFoundException('Usuário não encontrado')
      }
    }

    return { success: true }
  }
}
