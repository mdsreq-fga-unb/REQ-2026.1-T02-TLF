import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { nullifyTransactionDestinationAccountRefs } from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManyInstitutionsDto } from './dto/find-many.dto'
import { SyncInstitutionDto } from './dto/sync-institution.dto'

@Injectable()
export class InstitutionsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyInstitutionsDto) {
    const { userId, id, createdAfter, updatedAfter } = dto

    return this.prisma.institution.findMany({
      where: {
        userId,
        ...(id && { id }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async syncCreate(userId: string, dto: SyncInstitutionDto) {
    return this.prisma.institution.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        userId,
        name: dto.name,
        color: dto.color,
        logoUrl: dto.logoUrl ?? null,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        name: dto.name,
        color: dto.color,
        logoUrl: dto.logoUrl ?? null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncInstitutionDto) {
    const institution = await this.prisma.institution.findUnique({ where: { id: dto.id } })
    if (!institution) throw new NotFoundException('Instituição não encontrada')
    if (institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.institution.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        color: dto.color,
        logoUrl: dto.logoUrl ?? null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(userId: string, institutionId: string) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: institutionId },
      include: {
        accounts: {
          include: {
            invoices: true,
            recurrences: true,
            transactions: true,
          },
        },
      },
    })
    if (!institution) throw new NotFoundException('Instituição não encontrada')
    if (institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      for (const account of institution.accounts) {
        await nullifyTransactionDestinationAccountRefs(tx, account.id)

        await createDeletedRecords(
          tx,
          userId,
          TableName.INVOICES,
          account.invoices.map((i) => i.id),
        )
        await createDeletedRecords(
          tx,
          userId,
          TableName.RECURRENCES,
          account.recurrences.map((r) => r.id),
        )
        await createDeletedRecords(
          tx,
          userId,
          TableName.TRANSACTIONS,
          account.transactions.map((t) => t.id),
        )
        await createDeletedRecords(tx, userId, TableName.ACCOUNTS, [account.id]) // wouldnt be better make an array of account ids and delete them all at once?
      }

      await createDeletedRecords(tx, userId, TableName.INSTITUTIONS, [institutionId])
      await tx.institution.delete({ where: { id: institutionId } })
    })
  }
}
