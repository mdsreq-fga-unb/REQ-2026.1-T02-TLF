import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName, TransactionStatus } from 'generated/prisma/client'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { FilterTransactionsDto } from './dto/filter-transactions.dto'
import { FindManyTransactionsDto } from './dto/find-many.dto'
import { RemoveTransactionRequestDto } from './dto/remove.dto'
import { TransactionListResponseDto } from './dto/transaction-list.response.dto'
import { SyncTransactionDto } from './dto/sync-transaction.dto'

type TransactionWithRelations = {
  id: string
  type: string
  amount: number
  description: string | null
  date: Date
  status: string
  categoryId: string | null
  subCategoryId: string | null
  institutionId: string
  invoiceId: string | null
  recurrenceId: string | null
  destinationInstitutionId: string | null
  category: { id: string; name: string } | null
  subCategory: { id: string; name: string } | null
  institution: { id: string; name: string }
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyTransactionsDto) {
    const { userId, id, institutionId, categoryId, type, status, createdAfter, updatedAfter } = dto

    return this.prisma.transaction.findMany({
      where: {
        institution: { userId },
        ...(id && { id }),
        ...(institutionId && { institutionId }),
        ...(categoryId && { categoryId }),
        ...(type && { type }),
        ...(status && { status }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async create(userId: string, dto: CreateTransactionDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    })

    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    if (category.userId !== userId) {
      throw new BadRequestException('Categoria não pertence ao usuário')
    }

    if (dto.subCategoryId) {
      const subCategory = await this.prisma.subCategory.findUnique({
        where: { id: dto.subCategoryId },
      })
      if (!subCategory || subCategory.categoryId !== dto.categoryId) {
        throw new BadRequestException('Subcategoria inválida')
      }
    }

    await this.assertTransactionRelations(userId, {
      institutionId: dto.institutionId,
      invoiceId: dto.invoiceId,
      recurrenceId: dto.recurrenceId,
      destinationInstitutionId: dto.destinationInstitutionId,
    })

    const transaction = await this.prisma.transaction.create({
      data: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : new Date(),
        status: dto.status,
        invoiceId: dto.invoiceId,
        recurrenceId: dto.recurrenceId,
        destinationInstitutionId: dto.destinationInstitutionId,
      },
      include: {
        category: true,
        subCategory: true,
        institution: true,
      },
    })

    return this.formatTransaction(transaction as TransactionWithRelations)
  }

  private async getTransactionOrThrow(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        institution: true,
        category: true,
        subCategory: true,
      },
    })

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada')
    }

    if (transaction.institution.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta transação')
    }

    return transaction
  }

  async findAll(userId: string, query: FilterTransactionsDto): Promise<TransactionListResponseDto> {
    const { institutionId, categoryId, type, page = 1, limit = 20 } = query

    const skip = (page - 1) * limit

    const [data, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where: {
          institution: { userId },
          ...(institutionId && { institutionId }),
          ...(categoryId && { categoryId }),
          ...(type && { type }),
        },
        skip,
        take: limit,
        orderBy: {
          date: 'desc',
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          subCategory: {
            select: {
              id: true,
              name: true,
            },
          },
          institution: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      this.prisma.transaction.count({
        where: {
          institution: { userId },
          ...(institutionId && { institutionId }),
          ...(categoryId && { categoryId }),
          ...(type && { type }),
        },
      }),
    ])

    const formattedData = data.map((t) => this.formatTransaction(t as TransactionWithRelations))

    return {
      data: formattedData,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne({ userId, id }: { userId: string; id: string }) {
    const transaction = await this.getTransactionOrThrow(userId, id)
    return this.formatTransaction(transaction as TransactionWithRelations)
  }

  async update({ userId, id, dto }: { userId: string; id: string; dto: UpdateTransactionDto }) {
    const current = await this.getTransactionOrThrow(userId, id)

    const nextInstitutionId = dto.institutionId ?? current.institutionId
    const nextInvoiceId = dto.invoiceId ?? current.invoiceId
    const nextRecurrenceId = dto.recurrenceId ?? current.recurrenceId
    const nextDestinationInstitutionId =
      dto.destinationInstitutionId ?? current.destinationInstitutionId

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      })
      if (!category) {
        throw new NotFoundException('Categoria não encontrada')
      }
      if (category.userId !== userId) {
        throw new BadRequestException('Categoria não pertence ao usuário')
      }
    }

    if (dto.subCategoryId) {
      const subCategory = await this.prisma.subCategory.findUnique({
        where: { id: dto.subCategoryId },
      })
      if (!subCategory || (dto.categoryId ?? current.categoryId) !== subCategory.categoryId) {
        throw new BadRequestException('Subcategoria inválida')
      }
    }

    await this.assertTransactionRelations(userId, {
      institutionId: nextInstitutionId,
      invoiceId: nextInvoiceId,
      recurrenceId: nextRecurrenceId,
      destinationInstitutionId: nextDestinationInstitutionId,
    })

    const updated = await this.prisma.transaction.update({
      where: { id },
      data: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
        status: dto.status,
        invoiceId: dto.invoiceId,
        recurrenceId: dto.recurrenceId,
        destinationInstitutionId: dto.destinationInstitutionId,
      },
      include: {
        category: true,
        subCategory: true,
        institution: true,
      },
    })

    return this.formatTransaction(updated as TransactionWithRelations)
  }

  private async assertTransactionRelations(
    userId: string,
    data: {
      institutionId: string
      invoiceId?: string | null
      recurrenceId?: string | null
      destinationInstitutionId?: string | null
    },
  ): Promise<void> {
    const institution = await this.prisma.institution.findUnique({
      where: { id: data.institutionId },
    })
    if (!institution) throw new NotFoundException('Instituição não encontrada')
    if (institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    if (data.invoiceId) {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id: data.invoiceId },
        include: { account: { include: { institution: true } } },
      })
      if (!invoice) throw new NotFoundException('Fatura não encontrada')
      if (invoice.account.institution.userId !== userId) {
        throw new ForbiddenException('Acesso negado')
      }
      if (invoice.account.institutionId !== data.institutionId) {
        throw new BadRequestException('Fatura deve pertencer à mesma instituição da transação')
      }
    }

    if (data.recurrenceId) {
      const recurrence = await this.prisma.recurrence.findUnique({
        where: { id: data.recurrenceId },
        include: { account: { include: { institution: true } } },
      })
      if (!recurrence) throw new NotFoundException('Recorrência não encontrada')
      if (recurrence.account.institution.userId !== userId) {
        throw new ForbiddenException('Acesso negado')
      }
      if (recurrence.account.institutionId !== data.institutionId) {
        throw new BadRequestException('Recorrência deve pertencer à mesma instituição da transação')
      }
    }

    if (data.destinationInstitutionId) {
      const destination = await this.prisma.institution.findUnique({
        where: { id: data.destinationInstitutionId },
      })
      if (!destination) throw new NotFoundException('Instituição de destino não encontrada')
      if (destination.userId !== userId) throw new ForbiddenException('Acesso negado')
      if (destination.id === data.institutionId) {
        throw new BadRequestException('Instituição de destino deve ser diferente da origem')
      }
    }
  }

  async syncCreate(userId: string, dto: SyncTransactionDto) {
    await this.assertTransactionRelations(userId, {
      institutionId: dto.institutionId,
      invoiceId: dto.invoiceId,
      recurrenceId: dto.recurrenceId,
      destinationInstitutionId: dto.destinationInstitutionId,
    })

    return this.prisma.transaction.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : new Date(),
        status: dto.status ?? TransactionStatus.COMPLETED,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationInstitutionId: dto.destinationInstitutionId ?? null,
        installmentReference: dto.installmentReference ?? null,
        installmentNumber: dto.installmentNumber ?? null,
        installmentTotal: dto.installmentTotal ?? null,
        receiptUrl: dto.receiptUrl ?? null,
        externalId: dto.externalId ?? null,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : undefined,
        status: dto.status,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationInstitutionId: dto.destinationInstitutionId ?? null,
        installmentReference: dto.installmentReference ?? null,
        installmentNumber: dto.installmentNumber ?? null,
        installmentTotal: dto.installmentTotal ?? null,
        receiptUrl: dto.receiptUrl ?? null,
        externalId: dto.externalId ?? null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncTransactionDto) {
    await this.getTransactionOrThrow(userId, dto.id)
    await this.assertTransactionRelations(userId, {
      institutionId: dto.institutionId,
      invoiceId: dto.invoiceId,
      recurrenceId: dto.recurrenceId,
      destinationInstitutionId: dto.destinationInstitutionId,
    })

    return this.prisma.transaction.update({
      where: { id: dto.id },
      data: {
        institutionId: dto.institutionId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : undefined,
        status: dto.status,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationInstitutionId: dto.destinationInstitutionId ?? null,
        installmentReference: dto.installmentReference ?? null,
        installmentNumber: dto.installmentNumber ?? null,
        installmentTotal: dto.installmentTotal ?? null,
        receiptUrl: dto.receiptUrl ?? null,
        externalId: dto.externalId ?? null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      include: {
        category: true,
        subCategory: true,
        institution: true,
      },
    })
  }

  async remove(dto: RemoveTransactionRequestDto): Promise<void> {
    const { userId, id } = dto
    const transaction = await this.getTransactionOrThrow(userId, id)

    await this.prisma.$transaction(async (tx) => {
      await createDeletedRecords({ tx, userId, tableName: TableName.TRANSACTIONS, recordIds: [id] })
      await tx.transaction.delete({ where: { id: transaction.id } })
    })
  }

  private formatTransaction(transaction: TransactionWithRelations) {
    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description ?? undefined,
      date: transaction.date.toISOString(),
      status: transaction.status ?? undefined,
      destinationInstitutionId: transaction.destinationInstitutionId ?? undefined,
      category: transaction.category
        ? {
            id: transaction.category.id,
            name: transaction.category.name,
          }
        : undefined,
      subCategory: transaction.subCategory
        ? {
            id: transaction.subCategory.id,
            name: transaction.subCategory.name,
          }
        : undefined,
      institution: {
        id: transaction.institution.id,
        name: transaction.institution.name,
      },
    }
  }
}
