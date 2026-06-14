import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { FindManyBudgetsDto } from './dto/find-many.dto'
import { RemoveBudgetRequestDto } from './dto/remove.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { SyncBudgetDto } from './dto/sync-budget.dto'

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyBudgetsDto) {
    const { userId, id, categoryId, month, year, createdAfter, updatedAfter } = dto

    return this.prisma.budget.findMany({
      where: {
        userId,
        ...(id && { id }),
        ...(categoryId && { categoryId }),
        ...(month !== undefined && { month }),
        ...(year !== undefined && { year }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async create(userId: string, dto: CreateBudgetDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    })

    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId)
      throw new ForbiddenException('Categoria não pertence ao usuário')

    const existing = await this.prisma.budget.findUnique({
      where: {
        userId_categoryId_month_year: {
          userId,
          categoryId: dto.categoryId,
          month: dto.month,
          year: dto.year,
        },
      },
    })

    if (existing) throw new ConflictException('Orçamento já existe para essa categoria/mês/ano')

    return this.prisma.budget.create({
      data: { ...dto, userId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        category: { select: { id: true, name: true } },
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.budget.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        category: { select: { id: true, name: true } },
      },
    })
  }

  async findOne(userId: string, id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        userId: true,
        category: { select: { id: true, name: true } },
      },
    })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    return {
      id: budget.id,
      name: budget.name,
      amountLimit: budget.amountLimit,
      month: budget.month,
      year: budget.year,
      category: budget.category
        ? { id: budget.category.id, name: budget.category.name }
        : undefined,
    }
  }

  async findByCategory(userId: string, categoryId: string) {
    return this.prisma.budget.findMany({
      where: { userId, categoryId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        category: { select: { id: true, name: true } },
      },
    })
  }

  async update(userId: string, id: string, dto: UpdateBudgetDto) {
    const budget = await this.prisma.budget.findUnique({ where: { id } })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.budget.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        category: { select: { id: true, name: true } },
      },
    })
  }

  async syncCreate(userId: string, dto: SyncBudgetDto) {
    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId)
      throw new ForbiddenException('Categoria não pertence ao usuário')

    return this.prisma.budget.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        userId,
        categoryId: dto.categoryId,
        name: dto.name,
        amountLimit: dto.amountLimit,
        month: dto.month,
        year: dto.year,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        categoryId: dto.categoryId,
        name: dto.name,
        amountLimit: dto.amountLimit,
        month: dto.month,
        year: dto.year,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncBudgetDto) {
    const budget = await this.prisma.budget.findUnique({ where: { id: dto.id } })
    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.budget.update({
      where: { id: dto.id },
      data: {
        categoryId: dto.categoryId,
        name: dto.name,
        amountLimit: dto.amountLimit,
        month: dto.month,
        year: dto.year,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(dto: RemoveBudgetRequestDto): Promise<void> {
    const { userId, id } = dto
    const budget = await this.prisma.budget.findUnique({ where: { id } })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await createDeletedRecords({ tx, userId, tableName: TableName.BUDGETS, recordIds: [id] })
      await tx.budget.delete({ where: { id } })
    })
  }
}
