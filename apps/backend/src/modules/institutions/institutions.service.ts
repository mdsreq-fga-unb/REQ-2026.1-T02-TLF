import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { AccountsService } from '@modules/accounts/accounts.service'
import { TableName } from 'generated/prisma/client'
import { FindManyInstitutionsDto } from './dto/find-many.dto'
import { RemoveInstitutionRequestDto } from './dto/remove.dto'
import { SyncInstitutionDto } from './dto/sync-institution.dto'

@Injectable()
export class InstitutionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountsService: AccountsService,
  ) {}

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

  async remove(dto: RemoveInstitutionRequestDto): Promise<void> {
    const { userId, id: institutionId } = dto
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
        await this.accountsService.deleteAccountInTransaction({
          tx,
          userId,
          accountId: account.id,
          invoiceIds: account.invoices.map((i) => i.id),
          recurrenceIds: account.recurrences.map((r) => r.id),
          transactionIds: account.transactions.map((t) => t.id),
        })
      }

      await createDeletedRecords({
        tx,
        userId,
        tableName: TableName.INSTITUTIONS,
        recordIds: [institutionId],
      })
      await tx.institution.delete({ where: { id: institutionId } })
    })
  }
}
