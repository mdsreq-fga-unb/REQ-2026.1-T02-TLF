import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateInstitutionDto } from './dto/create-institution.dto'
import { UpdateInstitutionDto } from './dto/update-institution.dto'

@Injectable()
export class InstitutionService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkDuplicateName(userId: string, name: string, excludeId?: string) {
    const existing = await this.prisma.institution.findFirst({
      where: { userId, name },
    })
    if (existing && existing.id !== excludeId) {
      throw new ConflictException('Já existe uma instituição com esse nome')
    }
  }

  async create(userId: string, dto: CreateInstitutionDto) {
    await this.checkDuplicateName(userId, dto.name)

    return this.prisma.institution.create({
      data: { ...dto, userId },
      select: { id: true, name: true, color: true, icon: true, logoUrl: true },
    })
  }

  async findAll(userId: string) {
    return this.prisma.institution.findMany({
      where: { userId },
      select: { id: true, name: true, color: true, icon: true, logoUrl: true },
    })
  }

  async findOne(userId: string, id: string) {
    const institution = await this.prisma.institution.findUnique({
      where: { id, userId },
      select: { id: true, name: true, color: true, icon: true, logoUrl: true },
    })
    if (!institution) throw new NotFoundException('Instituição não encontrada')
    return institution
  }

  async update(userId: string, id: string, dto: UpdateInstitutionDto) {
    const institution = await this.prisma.institution.findUnique({ where: { id, userId } })
    if (!institution) throw new NotFoundException('Instituição não encontrada')

    if (dto.name) {
      await this.checkDuplicateName(userId, dto.name, id)
    }

    return this.prisma.institution.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, color: true, icon: true, logoUrl: true },
    })
  }

  async remove(userId: string, id: string) {
    const institution = await this.prisma.institution.findUnique({ where: { id, userId } })
    if (!institution) throw new NotFoundException('Instituição não encontrada')

    const accountCount = await this.prisma.account.count({
      where: { institutionId: id },
    })

    if (accountCount > 0) {
      throw new BadRequestException(
        `Esta instituição possui ${accountCount} conta(s) vinculada(s). Remova ou desvincule as contas antes de excluir a instituição.`,
      )
    }

    await this.prisma.institution.delete({ where: { id } })
    return { message: 'Instituição removida com sucesso' }
  }
}
