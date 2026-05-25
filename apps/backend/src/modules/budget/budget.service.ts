import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

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

    if (existing)
      throw new ConflictException('Orçamento já existe para essa categoria/mês/ano')

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
    if (budget.userId !== userId)
      throw new ForbiddenException('Acesso negado')

    const { userId: _, ...result } = budget
    return result
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
    if (budget.userId !== userId)
      throw new ForbiddenException('Acesso negado')

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

  async remove(userId: string, id: string) {
    const budget = await this.prisma.budget.findUnique({ where: { id } })

    if (!budget) throw new NotFoundException('Orçamento não encontrado')
    if (budget.userId !== userId)
      throw new ForbiddenException('Acesso negado')

    await this.prisma.budget.delete({ where: { id } })
    return { message: 'Orçamento removido com sucesso' }
  }
}