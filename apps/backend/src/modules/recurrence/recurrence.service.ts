import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateRecurrenceDto } from './dto/create-recurrence.dto'
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto'
import { RecurrenceApplyScope } from './enums/recurrence-apply-scope.enum'
import { Prisma, TransactionStatus, TransactionType } from '../../../generated/prisma/client'
import { FilterRecurrenceDto } from './dto/filter-recurrence.dto'
import { RecurrenceListResponseDto } from './dto/recurrence-list.response.dto'
import { RecurrenceDetailResponseDto } from './dto/recurrence-detail.response.dto'
import { DeleteRecurrenceDto } from './dto/delete-recurrence.dto'
import { RecurrenceDeleteScope } from './enums/recurrence-delete-scope.enum'
import { ConfirmRecurrenceDto } from './dto/confirm-recurrence.dto'
import { RecurrenceConfirmResponseDto } from './dto/recurrence-confirm.response.dto'
import { RecurrenceUnconfirmResponseDto } from './dto/recurrence-unconfirm.response.dto'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { TableName } from '../../../generated/prisma/client'

type RecurrenceWithRelations = Prisma.RecurrenceGetPayload<{
  include: typeof recurrenceInclude
}>

const recurrenceInclude = {
  institution: true,
  category: true,
  subCategory: true,
} as const satisfies Prisma.RecurrenceInclude

@Injectable()
export class RecurrenceService {
  private readonly logger = new Logger(RecurrenceService.name)

  constructor(private readonly prisma: PrismaService) {}

  private mapBase(recurrence: RecurrenceWithRelations) {
    return {
      id: recurrence.id,
      description: recurrence.description,
      amount: recurrence.amount,
      chargeDate: recurrence.chargeDate,
      startDate: recurrence.startDate.toISOString(),
      endDate: recurrence.endDate?.toISOString(),
      isActive: recurrence.isActive,
      category: recurrence.category
        ? {
            id: recurrence.category.id,
            name: recurrence.category.name,
          }
        : undefined,
      institution: {
        id: recurrence.institution.id,
        name: recurrence.institution.name,
      },
    }
  }

  private toDetail(recurrence: RecurrenceWithRelations): RecurrenceDetailResponseDto {
    return {
      ...this.mapBase(recurrence),
      subCategory: recurrence.subCategory
        ? {
            id: recurrence.subCategory.id,
            name: recurrence.subCategory.name,
          }
        : undefined,
    }
  }

  async create(userId: string, dto: CreateRecurrenceDto): Promise<RecurrenceDetailResponseDto> {
    await this.validateInstitutionOwnership(userId, dto.institutionId)

    await this.validateCategoryOwnership(userId, dto.categoryId)

    await this.validateSubCategory(userId, dto.categoryId, dto.subCategoryId)

    this.validateDates(new Date(dto.startDate), dto.endDate ? new Date(dto.endDate) : undefined)

    const recurrence = await this.prisma.recurrence.create({
      data: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        description: dto.description,
        amount: dto.amount,
        chargeDate: dto.chargeDate,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        isActive: dto.isActive ?? true,
      },
      include: recurrenceInclude,
    })

    return this.toDetail(recurrence)
  }

  async findAll(userId: string, query: FilterRecurrenceDto): Promise<RecurrenceListResponseDto> {
    const { categoryId, page = 1, limit = 20 } = query

    const skip = (page - 1) * limit

    const [recurrences, total] = await this.prisma.$transaction([
      this.prisma.recurrence.findMany({
        where: {
          institution: {
            userId,
          },
          ...(categoryId && { categoryId }),
        },
        include: recurrenceInclude,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.recurrence.count({
        where: {
          institution: {
            userId,
          },
          ...(categoryId && { categoryId }),
        },
      }),
    ])

    return {
      data: recurrences.map((r) => this.mapBase(r)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(userId: string, id: string): Promise<RecurrenceDetailResponseDto> {
    const recurrence = await this.getRecurrenceOrThrow(userId, id)
    return this.toDetail(recurrence)
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateRecurrenceDto,
  ): Promise<RecurrenceDetailResponseDto> {
    const recurrence = await this.getRecurrenceOrThrow(userId, id)
    const scope = dto.applyScope ?? RecurrenceApplyScope.THIS

    const categoryId = dto.categoryId ?? recurrence.categoryId

    if (dto.institutionId !== undefined) {
      await this.validateInstitutionOwnership(userId, dto.institutionId)
    }

    if (dto.categoryId !== undefined) {
      await this.validateCategoryOwnership(userId, dto.categoryId)
    }

    if (dto.subCategoryId !== undefined) {
      if (!categoryId) {
        throw new BadRequestException('Subcategoria requer uma categoria')
      }
      await this.validateSubCategory(userId, categoryId, dto.subCategoryId)
    }

    const nextStartDate = dto.startDate ? new Date(dto.startDate) : recurrence.startDate

    const nextEndDate =
      dto.endDate !== undefined ? (dto.endDate ? new Date(dto.endDate) : null) : recurrence.endDate

    this.validateDates(nextStartDate, nextEndDate ?? undefined)

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.recurrence.update({
        where: { id },
        data: {
          institution: dto.institutionId ? { connect: { id: dto.institutionId } } : undefined,

          category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,

          subCategory:
            dto.subCategoryId !== undefined
              ? dto.subCategoryId
                ? { connect: { id: dto.subCategoryId } }
                : { disconnect: true }
              : undefined,

          description: dto.description,
          amount: dto.amount,
          chargeDate: dto.chargeDate,
          startDate: dto.startDate ? new Date(dto.startDate) : undefined,
          endDate:
            dto.endDate !== undefined ? (dto.endDate ? new Date(dto.endDate) : null) : undefined,
          isActive: dto.isActive,
        },
        include: recurrenceInclude,
      })

      if (scope === RecurrenceApplyScope.ALL) {
        const [transactionCount, hasCompleted] = await Promise.all([
          tx.transaction.count({
            where: { recurrenceId: id },
          }),

          tx.transaction.findFirst({
            where: {
              recurrenceId: id,
              status: TransactionStatus.COMPLETED,
            },
            select: { id: true },
          }),
        ])

        if (hasCompleted) {
          throw new BadRequestException(
            'Não é possível aplicar alterações globais com transações concluídas',
          )
        }

        const changedStart =
          dto.startDate && new Date(dto.startDate).getTime() !== recurrence.startDate.getTime()

        const changedEnd =
          dto.endDate !== undefined &&
          (dto.endDate ? new Date(dto.endDate).getTime() : null) !==
            (recurrence.endDate ? recurrence.endDate.getTime() : null)

        const changedChargeDate = dto.chargeDate && dto.chargeDate !== recurrence.chargeDate

        if ((changedStart || changedEnd) && transactionCount > 0) {
          throw new BadRequestException(
            'Não é possível alterar período pois já existem transações geradas',
          )
        }

        if (changedChargeDate && transactionCount > 0) {
          throw new BadRequestException(
            'Não é possível alterar o dia de cobrança com transações já geradas',
          )
        }

        await tx.transaction.updateMany({
          where: {
            recurrenceId: id,
            status: {
              not: TransactionStatus.COMPLETED,
            },
          },
          data: {
            amount: dto.amount ?? recurrence.amount,
            categoryId: dto.categoryId ?? recurrence.categoryId,
            subCategoryId: dto.subCategoryId ?? recurrence.subCategoryId,
            description: dto.description ?? recurrence.description,
          },
        })
      }

      if (scope === RecurrenceApplyScope.FUTURE) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const futureTransactions = await tx.transaction.findMany({
          where: {
            recurrenceId: id,
            date: {
              gte: recurrence.startDate > today ? recurrence.startDate : today,
            },
          },
          orderBy: {
            date: 'asc',
          },
        })

        const hasCompletedFuture = futureTransactions.some(
          (t) => t.status === TransactionStatus.COMPLETED,
        )

        if (hasCompletedFuture) {
          throw new BadRequestException(
            'Não é possível alterar recorrência com transações futuras já concluídas',
          )
        }

        const hasAnyFuture = futureTransactions.length > 0

        const changedCriticalFields =
          dto.startDate ||
          dto.endDate !== undefined ||
          dto.chargeDate !== undefined ||
          dto.categoryId ||
          dto.subCategoryId

        if (changedCriticalFields && hasAnyFuture) {
          throw new BadRequestException(
            'Alterações estruturais não podem ser aplicadas pois já existem transações futuras geradas',
          )
        }

        await tx.recurrence.update({
          where: { id },
          data: {
            categoryId: dto.categoryId ?? undefined,
            subCategoryId: dto.subCategoryId ?? undefined,
            description: dto.description ?? undefined,
            amount: dto.amount ?? undefined,
            chargeDate: dto.chargeDate ?? undefined,
            isActive: dto.isActive ?? undefined,
          },
        })
      }

      return updated
    })

    return this.toDetail(result)
  }

  async remove(
    userId: string,
    id: string,
    dto?: DeleteRecurrenceDto,
  ): Promise<RecurrenceDetailResponseDto> {
    const recurrence = await this.getRecurrenceOrThrow(userId, id)
    const scope = dto?.scope ?? RecurrenceDeleteScope.THIS

    const result = await this.prisma.$transaction(async (tx) => {
      if (scope === RecurrenceDeleteScope.THIS) {
        const deleted = await tx.recurrence.delete({
          where: { id },
          include: recurrenceInclude,
        })

        return deleted
      }

      if (scope === RecurrenceDeleteScope.FUTURE) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        await tx.transaction.deleteMany({
          where: {
            recurrenceId: id,
            date: {
              gte: recurrence.startDate > today ? recurrence.startDate : today,
            },
            status: {
              not: TransactionStatus.COMPLETED,
            },
          },
        })

        const updated = await tx.recurrence.update({
          where: { id },
          data: {
            endDate: new Date(today.getTime() - 1),
            isActive: false,
          },
          include: recurrenceInclude,
        })

        return updated
      }

      if (scope === RecurrenceDeleteScope.ALL) {
        await tx.transaction.deleteMany({
          where: {
            recurrenceId: id,
          },
        })

        const deleted = await tx.recurrence.delete({
          where: { id },
          include: recurrenceInclude,
        })

        return deleted
      }

      throw new BadRequestException('Scope inválido para exclusão de recorrência')
    })

    return this.toDetail(result)
  }

  // Confirma a ocorrência da recorrência no mês de referência, lançando-a no sistema de
  // transações. Usa "complete-or-create": conclui a transação PENDENTE gerada pelo job
  // mensal (se existir) em vez de criar uma duplicada; cria uma COMPLETED quando não há
  // nenhuma; e é idempotente quando já existe uma concluída no mês.
  async confirmOccurrence(
    userId: string,
    id: string,
    dto?: ConfirmRecurrenceDto,
  ): Promise<RecurrenceConfirmResponseDto> {
    const recurrence = await this.getRecurrenceOrThrow(userId, id)

    const reference = dto?.referenceDate ? new Date(dto.referenceDate) : new Date()
    const year = reference.getFullYear()
    const month = reference.getMonth()

    const startOfMonth = new Date(year, month, 1)
    const startOfNextMonth = new Date(year, month + 1, 1)
    const lastDay = new Date(year, month + 1, 0).getDate()
    const day = Math.min(recurrence.chargeDate, lastDay)
    // Meio-dia UTC para o dia da cobrança não "voltar" um dia ao exibir em fusos negativos.
    const chargeDate = new Date(Date.UTC(year, month, day, 12, 0, 0))

    const transaction = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.transaction.findFirst({
        where: {
          recurrenceId: id,
          date: { gte: startOfMonth, lt: startOfNextMonth },
        },
        orderBy: { createdAt: 'asc' },
      })

      if (existing) {
        // Idempotência: já concluída neste mês, não duplica.
        if (existing.status === TransactionStatus.COMPLETED) {
          return { record: existing, created: false }
        }

        // Conclui a transação pendente (gerada pelo job) sincronizando os dados da recorrência.
        const updated = await tx.transaction.update({
          where: { id: existing.id },
          data: {
            status: TransactionStatus.COMPLETED,
            amount: recurrence.amount,
            categoryId: recurrence.categoryId,
            subCategoryId: recurrence.subCategoryId,
            description: recurrence.description,
            date: chargeDate,
          },
        })

        return { record: updated, created: false }
      }

      const created = await tx.transaction.create({
        data: {
          institutionId: recurrence.institutionId,
          categoryId: recurrence.categoryId,
          subCategoryId: recurrence.subCategoryId,
          amount: recurrence.amount,
          description: recurrence.description,
          type: TransactionType.EXPENSE,
          status: TransactionStatus.COMPLETED,
          date: chargeDate,
          recurrenceId: id,
        },
      })

      return { record: created, created: true }
    })

    return {
      id: transaction.record.id,
      recurrenceId: id,
      status: transaction.record.status,
      amount: transaction.record.amount,
      date: transaction.record.date.toISOString(),
      created: transaction.created,
    }
  }

  // Desfaz a confirmação do mês: remove a(s) transação(ões) lançada(s) para a recorrência
  // naquele mês, registrando a exclusão para o sync (offline-first).
  async unconfirmOccurrence(
    userId: string,
    id: string,
    dto?: ConfirmRecurrenceDto,
  ): Promise<RecurrenceUnconfirmResponseDto> {
    await this.getRecurrenceOrThrow(userId, id)

    const reference = dto?.referenceDate ? new Date(dto.referenceDate) : new Date()
    const year = reference.getFullYear()
    const month = reference.getMonth()
    const startOfMonth = new Date(year, month, 1)
    const startOfNextMonth = new Date(year, month + 1, 1)

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.transaction.findMany({
        where: {
          recurrenceId: id,
          date: { gte: startOfMonth, lt: startOfNextMonth },
        },
        select: { id: true },
      })

      if (existing.length === 0) {
        return { recurrenceId: id, removed: false, count: 0 }
      }

      const recordIds = existing.map((t) => t.id)

      await createDeletedRecords({
        tx,
        userId,
        tableName: TableName.TRANSACTIONS,
        recordIds,
      })
      await tx.transaction.deleteMany({ where: { id: { in: recordIds } } })

      return { recurrenceId: id, removed: true, count: recordIds.length }
    })
  }

  async generateTransactionsFromRecurrences() {
    const now = new Date()
    this.logger.log(`Recurrence job started at ${now.toISOString()}`)

    const recurrences = await this.prisma.recurrence.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      include: recurrenceInclude,
    })

    this.logger.log(`Found ${recurrences.length} active recurrences`)

    const month = now.getMonth()
    const year = now.getFullYear()

    const startOfMonth = new Date(year, month, 1)
    const startOfNextMonth = new Date(year, month + 1, 1)

    const existingTransactions = await this.prisma.transaction.findMany({
      where: {
        recurrenceId: {
          in: recurrences.map((r) => r.id),
        },
        date: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      select: {
        recurrenceId: true,
      },
    })

    const existingSet = new Set(existingTransactions.map((t) => t.recurrenceId))

    const toCreate = recurrences.filter((r) => !existingSet.has(r.id))

    await this.prisma.transaction.createMany({
      data: toCreate.map((recurrence) => {
        const lastDay = new Date(year, month + 1, 0).getDate()
        const day = Math.min(recurrence.chargeDate, lastDay)

        return {
          institutionId: recurrence.institutionId,
          categoryId: recurrence.categoryId,
          subCategoryId: recurrence.subCategoryId,
          amount: recurrence.amount,
          description: recurrence.description,
          type: TransactionType.EXPENSE,
          status: TransactionStatus.PENDING,
          // Meio-dia UTC para o dia da cobrança ser estável independente do fuso.
          date: new Date(Date.UTC(year, month, day, 12, 0, 0)),
          recurrenceId: recurrence.id,
        }
      }),
    })

    this.logger.log(`Created ${toCreate.length} transactions for current month`)
    this.logger.log('Recurrence job finished successfully')
  }

  private async validateInstitutionOwnership(userId: string, institutionId: string) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: institutionId },
    })

    if (!institution) {
      throw new NotFoundException('Instituição não encontrada')
    }

    if (institution.userId !== userId) {
      throw new ForbiddenException('Instituição não pertence ao usuário')
    }

    return institution
  }

  private async validateCategoryOwnership(userId: string, categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Categoria não pertence ao usuário')
    }

    return category
  }

  private async validateSubCategory(userId: string, categoryId: string, subCategoryId?: string) {
    if (!subCategoryId) {
      return null
    }

    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId },
      include: { category: true },
    })

    if (!subCategory) {
      throw new NotFoundException('Subcategoria não encontrada')
    }

    if (subCategory.category.userId !== userId) {
      throw new ForbiddenException('Subcategoria não pertence ao usuário')
    }

    if (subCategory.categoryId !== categoryId) {
      throw new BadRequestException('Subcategoria não pertence à categoria informada')
    }
    return subCategory
  }

  private validateDates(startDate: Date, endDate?: Date) {
    if (endDate && endDate < startDate) {
      throw new BadRequestException('Data final não pode ser menor que a data inicial')
    }
  }

  private async getRecurrenceOrThrow(userId: string, id: string) {
    const recurrence = await this.prisma.recurrence.findUnique({
      where: { id },
      include: recurrenceInclude,
    })

    if (!recurrence) {
      throw new NotFoundException('Recorrência não encontrada')
    }

    if (recurrence.institution.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta recorrência')
    }

    return recurrence
  }
}
