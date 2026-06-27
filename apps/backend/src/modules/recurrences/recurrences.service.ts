import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { nullifyTransactionRecurrenceRefs } from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManyRecurrencesDto } from './dto/find-many.dto'
import { RemoveRecurrenceRequestDto } from './dto/remove.dto'
import { SyncRecurrenceDto } from './dto/sync-recurrence.dto'

@Injectable()
export class RecurrencesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyRecurrencesDto) {
    const { userId, id, institutionId, categoryId, isActive, createdAfter, updatedAfter } = dto

    return this.prisma.recurrence.findMany({
      where: {
        institution: { userId },
        ...(id && { id }),
        ...(institutionId && { institutionId }),
        ...(categoryId && { categoryId }),
        ...(isActive !== undefined && { isActive }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  private async assertInstitutionOwnership(userId: string, institutionId: string) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: institutionId },
    })
    if (!institution) throw new NotFoundException('Instituição não encontrada')
    if (institution.userId !== userId) throw new ForbiddenException('Acesso negado')
  }

  async syncCreate(userId: string, dto: SyncRecurrenceDto) {
    await this.assertInstitutionOwnership(userId, dto.institutionId)
    return this.prisma.recurrence.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        description: dto.description,
        amount: dto.amount,
        isActive: dto.isActive ?? true,
        chargeDate: dto.chargeDate,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        description: dto.description,
        amount: dto.amount,
        isActive: dto.isActive,
        chargeDate: dto.chargeDate,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncRecurrenceDto) {
    const recurrence = await this.prisma.recurrence.findUnique({
      where: { id: dto.id },
      include: { institution: true },
    })
    if (!recurrence) throw new NotFoundException('Recorrência não encontrada')
    if (recurrence.institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.recurrence.update({
      where: { id: dto.id },
      data: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        description: dto.description,
        amount: dto.amount,
        isActive: dto.isActive,
        chargeDate: dto.chargeDate,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(dto: RemoveRecurrenceRequestDto): Promise<void> {
    const { userId, id: recurrenceId } = dto
    const recurrence = await this.prisma.recurrence.findUnique({
      where: { id: recurrenceId },
      include: { institution: true },
    })
    if (!recurrence) throw new NotFoundException('Recorrência não encontrada')
    if (recurrence.institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await nullifyTransactionRecurrenceRefs(tx, recurrenceId)
      await createDeletedRecords({
        tx,
        userId,
        tableName: TableName.RECURRENCES,
        recordIds: [recurrenceId],
      })
      await tx.recurrence.delete({ where: { id: recurrenceId } })
    })
  }
}
