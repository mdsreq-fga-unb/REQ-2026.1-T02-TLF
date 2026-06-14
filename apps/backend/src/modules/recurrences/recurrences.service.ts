import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { nullifyTransactionRecurrenceRefs } from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManyRecurrencesDto } from './dto/find-many.dto'
import { SyncRecurrenceDto } from './dto/sync-recurrence.dto'

@Injectable()
export class RecurrencesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyRecurrencesDto) {
    const { userId, id, accountId, categoryId, isActive, createdAfter, updatedAfter } = dto

    return this.prisma.recurrence.findMany({
      where: {
        account: { institution: { userId } },
        ...(id && { id }),
        ...(accountId && { accountId }),
        ...(categoryId && { categoryId }),
        ...(isActive !== undefined && { isActive }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  private async assertAccountOwnership(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { institution: true },
    })
    if (!account) throw new NotFoundException('Conta não encontrada')
    if (account.institution.userId !== userId) throw new ForbiddenException('Acesso negado')
  }

  async syncCreate(userId: string, dto: SyncRecurrenceDto) {
    await this.assertAccountOwnership(userId, dto.accountId)
    return this.prisma.recurrence.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        accountId: dto.accountId,
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
        accountId: dto.accountId,
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
      include: { account: { include: { institution: true } } },
    })
    if (!recurrence) throw new NotFoundException('Recorrência não encontrada')
    if (recurrence.account.institution.userId !== userId)
      throw new ForbiddenException('Acesso negado')

    return this.prisma.recurrence.update({
      where: { id: dto.id },
      data: {
        accountId: dto.accountId,
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

  async remove(userId: string, recurrenceId: string) {
    const recurrence = await this.prisma.recurrence.findUnique({
      where: { id: recurrenceId },
      include: { account: { include: { institution: true } } },
    })
    if (!recurrence) throw new NotFoundException('Recorrência não encontrada')
    if (recurrence.account.institution.userId !== userId)
      throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await nullifyTransactionRecurrenceRefs(tx, recurrenceId)
      await createDeletedRecords(tx, userId, TableName.RECURRENCES, [recurrenceId])
      await tx.recurrence.delete({ where: { id: recurrenceId } })
    })
  }
}
