import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { TransactionType } from '../../../generated/prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: string, dto: CreateTransactionDto) {
    // CA2: valida se a categoria existe e pertence ao usuário
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

    // CA1, CA3, CA6: cria a transação
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
      select: {
        id: true,
        type: true,
        amount: true,
        description: true,
        date: true,
        status: true,
        category: { select: { id: true, name: true } },
        subCategory: { select: { id: true, name: true } },
        account: { select: { id: true, name: true } },
      },
    })

    return transaction
  }

  findAll({
    userId,
    categoryId,
    type,
  }: {
    userId: string,
    categoryId?: string,
    type?: TransactionType,
  }) {
    return this.prisma.transaction.findMany({
      where: {
        account: {
          is: {
            institution: {
              is: {
                userId,
              },
            }
          }
        },
        ...(categoryId && { categoryId: categoryId }),
        ...(type && { type }),
      },
    });
  }

  async findOne({ userId, id }: { userId: string, id: string }) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        account: {
          is: {
            institution: {
              is: {
                userId,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    return transaction;
  }
}