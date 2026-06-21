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

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyTransactionsDto) {
    const { userId, id, accountId, categoryId, type, status, createdAfter, updatedAfter } = dto

    return this.prisma.transaction.findMany({
      where: {
        account: { institution: { userId } },
        ...(id && { id }),
        ...(accountId && { accountId }),
        ...(categoryId && { categoryId }),
        ...(type && { type }),
        ...(status && { status }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async create(userId: string, dto: CreateTransactionDto) {
    // valida se a categoria existe e pertence ao usuário
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    })

    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    if (category.userId !== userId) {
      throw new BadRequestException('Categoria não pertence ao usuário')
    }

    // valida subcategoria se informada
    if (dto.subCategoryId) {
      const subCategory = await this.prisma.subCategory.findUnique({
        where: { id: dto.subCategoryId },
      })
      if (!subCategory || subCategory.categoryId !== dto.categoryId) {
        throw new BadRequestException('Subcategoria inválida')
      }
    }

    // valida se a conta existe e pertence ao usuário
    const account = await this.prisma.account.findUnique({
      where: { id: dto.accountId },
      include: {
        institution: true,
      },
    })

    if (!account) {
      throw new NotFoundException('Conta não encontrada')
    }

    if (account.institution.userId !== userId) {
      throw new BadRequestException('Conta não pertence ao usuário')
    }

    if (dto.destinationAccountId) {
      const destinationAccount = await this.prisma.account.findUnique({
        where: { id: dto.destinationAccountId },
        include: {
          institution: true,
        },
      })

      if (!destinationAccount) {
        throw new NotFoundException('Conta de destino não encontrada')
      }

      if (destinationAccount.institution.userId !== userId) {
        throw new BadRequestException('Conta de destino não pertence ao usuário')
      }
    }

    // cria a transação
    const transaction = await this.prisma.transaction.create({
      data: {
        accountId: dto.accountId,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : new Date(),
        status: dto.status,
        destinationAccountId: dto.destinationAccountId,
      },
      include: {
        category: true,
        subCategory: true,
        account: true,
        destinationAccount: true,
      },
    })

    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description ?? undefined,
      date: transaction.date.toISOString(),
      status: transaction.status ?? undefined,
      destinationAccountId: transaction.destinationAccountId ?? undefined,

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

      account: {
        id: transaction.account.id,
        name: transaction.account.name,
      },
    }
  }

  private async getTransactionOrThrow(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        account: {
          include: {
            institution: true,
          },
        },
        category: true,
        subCategory: true,
      },
    })

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada')
    }

    if (transaction.account.institution.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta transação')
    }

    return transaction
  }

  async findAll(userId: string, query: FilterTransactionsDto): Promise<TransactionListResponseDto> {
    const { categoryId, type, page = 1, limit = 20 } = query

    const skip = (page - 1) * limit

    const [data, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where: {
          account: {
            institution: { userId },
          },
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
          account: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      this.prisma.transaction.count({
        where: {
          account: {
            institution: { userId },
          },
          ...(categoryId && { categoryId }),
          ...(type && { type }),
        },
      }),
    ])

    const formattedData = data.map((t) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      description: t.description ?? undefined,
      date: t.date.toISOString(),
      status: t.status ?? undefined,
      category: t.category ?? undefined,
      subCategory: t.subCategory ?? undefined,
      account: t.account,
      destinationAccountId: t.destinationAccountId ?? undefined,
    }))

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

    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description ?? undefined,
      date: transaction.date.toISOString(),
      status: transaction.status ?? undefined,
      destinationAccountId: transaction.destinationAccountId ?? undefined,

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

      account: {
        id: transaction.account.id,
        name: transaction.account.name,
      },
    }
  }

  async update({ userId, id, dto }: { userId: string; id: string; dto: UpdateTransactionDto }) {
    await this.getTransactionOrThrow(userId, id)

    const updated = await this.prisma.transaction.update({
      where: { id },
      data: dto,
      include: {
        category: true,
        subCategory: true,
        account: true,
      },
    })

    return {
      id: updated.id,
      type: updated.type,
      amount: updated.amount,
      description: updated.description ?? undefined,
      date: updated.date.toISOString(),
      status: updated.status ?? undefined,
      destinationAccountId: updated.destinationAccountId ?? undefined,

      category: updated.category
        ? {
            id: updated.category.id,
            name: updated.category.name,
          }
        : undefined,

      subCategory: updated.subCategory
        ? {
            id: updated.subCategory.id,
            name: updated.subCategory.name,
          }
        : undefined,

      account: {
        id: updated.account.id,
        name: updated.account.name,
      },
    }
  }

  private async assertTransactionRelations(
    userId: string,
    data: {
      accountId: string
      invoiceId?: string | null
      recurrenceId?: string | null
      destinationAccountId?: string | null
    },
  ): Promise<void> {
    const account = await this.prisma.account.findUnique({
      where: { id: data.accountId },
      include: { institution: true },
    })
    if (!account) throw new NotFoundException('Conta não encontrada')
    if (account.institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    if (data.invoiceId) {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id: data.invoiceId },
        include: { account: { include: { institution: true } } },
      })
      if (!invoice) throw new NotFoundException('Fatura não encontrada')
      if (invoice.account.institution.userId !== userId)
        throw new ForbiddenException('Acesso negado')
      if (invoice.accountId !== data.accountId) {
        throw new BadRequestException('Fatura deve pertencer à mesma conta da transação')
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
      if (recurrence.accountId !== data.accountId) {
        throw new BadRequestException('Recorrência deve pertencer à mesma conta da transação')
      }
    }

    if (data.destinationAccountId) {
      const destination = await this.prisma.account.findUnique({
        where: { id: data.destinationAccountId },
        include: { institution: true },
      })
      if (!destination) throw new NotFoundException('Conta destino não encontrada')
      if (destination.institution.userId !== userId) throw new ForbiddenException('Acesso negado')
    }
  }

  async syncCreate(userId: string, dto: SyncTransactionDto) {
    await this.assertTransactionRelations(userId, {
      accountId: dto.accountId,
      invoiceId: dto.invoiceId,
      recurrenceId: dto.recurrenceId,
      destinationAccountId: dto.destinationAccountId,
    })

    return this.prisma.transaction.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        accountId: dto.accountId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : new Date(),
        status: dto.status ?? TransactionStatus.COMPLETED,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationAccountId: dto.destinationAccountId ?? null,
        installmentReference: dto.installmentReference ?? null,
        installmentNumber: dto.installmentNumber ?? null,
        installmentTotal: dto.installmentTotal ?? null,
        receiptUrl: dto.receiptUrl ?? null,
        externalId: dto.externalId ?? null,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        accountId: dto.accountId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : undefined,
        status: dto.status,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationAccountId: dto.destinationAccountId ?? null,
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
      accountId: dto.accountId,
      invoiceId: dto.invoiceId,
      recurrenceId: dto.recurrenceId,
      destinationAccountId: dto.destinationAccountId,
    })

    return this.prisma.transaction.update({
      where: { id: dto.id },
      data: {
        accountId: dto.accountId,
        categoryId: dto.categoryId ?? null,
        subCategoryId: dto.subCategoryId ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        date: dto.date ? new Date(dto.date) : undefined,
        status: dto.status,
        invoiceId: dto.invoiceId ?? null,
        recurrenceId: dto.recurrenceId ?? null,
        destinationAccountId: dto.destinationAccountId ?? null,
        installmentReference: dto.installmentReference ?? null,
        installmentNumber: dto.installmentNumber ?? null,
        installmentTotal: dto.installmentTotal ?? null,
        receiptUrl: dto.receiptUrl ?? null,
        externalId: dto.externalId ?? null,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(dto: RemoveTransactionRequestDto): Promise<void> {
    const { userId, id } = dto
    await this.getTransactionOrThrow(userId, id)

    await this.prisma.$transaction(async (tx) => {
      await createDeletedRecords({ tx, userId, tableName: TableName.TRANSACTIONS, recordIds: [id] })
      await tx.transaction.delete({ where: { id } })
    })
  }
}
