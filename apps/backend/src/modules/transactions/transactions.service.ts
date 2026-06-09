import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { FilterTransactionsDto } from './dto/filter-transactions.dto'
import { TransactionListResponseDto } from './dto/transaction-list.response.dto'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

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

    // valida se a conta existe
    const account = await this.prisma.account.findUnique({
      where: { id: dto.accountId },
    })

    if (!account) {
      throw new NotFoundException('Conta não encontrada')
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
      },
      include: {
        category: true,
        subCategory: true,
        account: true,
      },
    })

    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description ?? undefined,
      date: transaction.date.toISOString(),
      status: transaction.status ?? undefined,

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

    if (!transaction || transaction.deletedAt) {
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
          deletedAt: null,
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
          deletedAt: null,
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

  async remove({ userId, id }: { userId: string; id: string }) {
    await this.getTransactionOrThrow(userId, id)

    const deleted = await this.prisma.transaction.delete({
      where: { id },
      include: {
        category: true,
        subCategory: true,
        account: true,
      },
    })

    return {
      id: deleted.id,
      type: deleted.type,
      amount: deleted.amount,
      description: deleted.description ?? undefined,
      date: deleted.date.toISOString(),
      status: deleted.status ?? undefined,

      category: deleted.category
        ? {
            id: deleted.category.id,
            name: deleted.category.name,
          }
        : undefined,

      subCategory: deleted.subCategory
        ? {
            id: deleted.subCategory.id,
            name: deleted.subCategory.name,
          }
        : undefined,

      account: {
        id: deleted.account.id,
        name: deleted.account.name,
      },
    }
  }
}
