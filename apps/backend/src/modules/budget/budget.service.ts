import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName, TransactionType } from 'generated/prisma/client'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { FindManyBudgetsDto } from './dto/find-many.dto'
import { RemoveBudgetRequestDto } from './dto/remove.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { SyncBudgetDto } from './dto/sync-budget.dto'

type BudgetCategory = {
  id: string
  name: string
  color: string
  icon: string
}

type BudgetBase = {
  id: string
  name: string
  amountLimit: number
  month: number
  year: number
  categoryId: string
  userId?: string
  category?: BudgetCategory | null
  createdAt: Date
  updatedAt: Date
}

type BudgetSummary = {
  spentValue: number
  remainingValue: number
  spentPercentage: number
}

type BudgetWithSummary = BudgetBase & BudgetSummary

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  private getBudgetPeriod(month: number, year: number) {
    return {
      start: new Date(Date.UTC(year, month - 1, 1)),
      end: new Date(Date.UTC(year, month, 1)),
    }
  }

  private async getBudgetSpentValue(
    userId: string,
    categoryId: string,
    month: number,
    year: number,
  ) {
    const { start, end } = this.getBudgetPeriod(month, year)
    const result = await this.prisma.transaction.aggregate({
      where: {
        type: TransactionType.EXPENSE,
        categoryId,
        institution: {
          userId,
        },
        date: {
          gte: start,
          lt: end,
        },
      },
      _sum: {
        amount: true,
      },
    })

    return result._sum.amount ?? 0
  }

  private normalizeBudget<T extends BudgetBase>(budget: T): BudgetBase {
    const { userId, ...result } = budget
    void userId
    return result
  }

  private async attachBudgetSummary<T extends BudgetBase>(
    budget: T,
    userId?: string,
  ): Promise<BudgetWithSummary> {
    const normalizedBudget = this.normalizeBudget(budget)
    const spentValue = await this.getBudgetSpentValue(
      userId ?? budget.userId ?? '',
      normalizedBudget.categoryId,
      normalizedBudget.month,
      normalizedBudget.year,
    )
    const remainingValue = normalizedBudget.amountLimit - spentValue
    const spentPercentage =
      normalizedBudget.amountLimit > 0
        ? Math.round((spentValue / normalizedBudget.amountLimit) * 100)
        : 0

    return {
      ...normalizedBudget,
      spentValue,
      remainingValue,
      spentPercentage,
    }
  }

  private async attachBudgetsSummary<T extends BudgetBase>(budgets: T[], userId?: string) {
    return Promise.all(budgets.map((budget) => this.attachBudgetSummary(budget, userId)))
  }

  async findMany(dto: FindManyBudgetsDto) {
    const { userId, id, categoryId, month, year, createdAfter, updatedAfter } = dto

    const budgets = await this.prisma.budget.findMany({
      where: {
        userId,
        ...(id && { id }),
        ...(categoryId && { categoryId }),
        ...(month !== undefined && { month }),
        ...(year !== undefined && { year }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })

    return this.attachBudgetsSummary(budgets as BudgetBase[], userId)
  }

  async create(userId: string, dto: CreateBudgetDto) {
    // TODO: Validar categoria quando o módulo de categorias estiver implementado
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

    const budget = await this.prisma.budget.create({
      data: { ...dto, userId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        categoryId: true,
        // TODO: Retornar category quando o módulo de categorias estiver implementado
        category: { select: { id: true, name: true, color: true, icon: true } },
      },
    })

    return this.attachBudgetSummary(budget as BudgetBase, userId)
  }

  async findAll(userId: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        categoryId: true,
        category: { select: { id: true, name: true, color: true, icon: true } },
      },
    })

    return this.attachBudgetsSummary(budgets as BudgetBase[], userId)
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
        categoryId: true,
        userId: true,
        category: { select: { id: true, name: true, color: true, icon: true } },
      },
    })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.attachBudgetSummary(budget as BudgetBase, userId)
  }

  async findByCategory(userId: string, categoryId: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { userId, categoryId },
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        categoryId: true,
        category: { select: { id: true, name: true, color: true, icon: true } },
      },
    })

    return this.attachBudgetsSummary(budgets as BudgetBase[], userId)
  }

  async update(userId: string, id: string, dto: UpdateBudgetDto) {
    const budget = await this.prisma.budget.findUnique({ where: { id } })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    const updatedBudget = await this.prisma.budget.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        amountLimit: true,
        month: true,
        year: true,
        categoryId: true,
        category: { select: { id: true, name: true, color: true, icon: true } },
      },
    })

    return this.attachBudgetSummary(updatedBudget as BudgetBase, userId)
  }

  async syncCreate(userId: string, dto: SyncBudgetDto) {
    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId)
      throw new ForbiddenException('Categoria não pertence ao usuário')

    const budget = await this.prisma.budget.upsert({
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

    return this.attachBudgetSummary(budget as BudgetBase, userId)
  }

  async syncUpdate(userId: string, dto: SyncBudgetDto) {
    const budget = await this.prisma.budget.findUnique({ where: { id: dto.id } })
    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId) throw new ForbiddenException('Acesso negado')

    const updatedBudget = await this.prisma.budget.update({
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

    return this.attachBudgetSummary(updatedBudget as BudgetBase, userId)
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
