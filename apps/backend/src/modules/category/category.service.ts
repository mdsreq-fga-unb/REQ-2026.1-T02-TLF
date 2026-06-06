import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkDuplicateName(userId: string, name: string, excludeId?: string) {
    const existing = await this.prisma.category.findUnique({
      where: { userId_name: { userId, name } },
    })
    if (existing && existing.id !== excludeId) {
      throw new ConflictException('Já existe uma categoria com esse nome')
    }
  }

  private async reclassify(userId: string, fromCategoryId: string, toCategoryId: string) {
  const newCategory = await this.prisma.category.findUnique({
    where: { id: toCategoryId },
  })
  if (!newCategory) throw new NotFoundException('Categoria destino não encontrada')
  if (newCategory.userId !== userId) throw new ForbiddenException('Categoria destino não pertence ao usuário')

  await Promise.all([
    this.prisma.transaction.updateMany({
      where: { categoryId: fromCategoryId },
      data: { categoryId: toCategoryId },
    }),
    this.prisma.budget.updateMany({
      where: { categoryId: fromCategoryId },
      data: { categoryId: toCategoryId },
    }),
    this.prisma.recurrence.updateMany({
      where: { categoryId: fromCategoryId },
      data: { categoryId: toCategoryId },
    }),
  ])
}

  async create(userId: string, dto: CreateCategoryDto) {
    await this.checkDuplicateName(userId, dto.name)

    return this.prisma.category.create({
      data: { ...dto, userId },
      select: { id: true, name: true, icon: true, color: true, isDefault: true },
    })
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      select: { id: true, name: true, icon: true, color: true, isDefault: true },
    })
  }

  async findOne(userId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id, userId },
      select: { id: true, name: true, icon: true, color: true, isDefault: true },
    })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    return category
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto, newCategoryId?: string) {
    const category = await this.prisma.category.findUnique({ where: { id, userId } })
    if (!category) throw new NotFoundException('Categoria não encontrada')

    if (category.isDefault && dto.name) {
      throw new ForbiddenException('Categorias padrão não permitem alteração de nome')
    }

    if (dto.name) {
      await this.checkDuplicateName(userId, dto.name, id)
    }

    if (newCategoryId) {
      await this.reclassify(userId, id, newCategoryId)
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, icon: true, color: true, isDefault: true },
    })
  }

  async remove(userId: string, id: string, newCategoryId?: string) {
    const category = await this.prisma.category.findUnique({ where: { id, userId } })
    if (!category) throw new NotFoundException('Categoria não encontrada')

    if (category.isDefault) {
      throw new ForbiddenException('Categorias padrão não podem ser removidas')
    }

    if (newCategoryId) {
      await this.reclassify(userId, id, newCategoryId)
    }

    await this.prisma.category.delete({ where: { id } })
    return { message: 'Categoria removida com sucesso' }
  }
}