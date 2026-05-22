import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { userId_name: { userId, name: dto.name } },
    })
    if (existing) throw new ConflictException('Já existe uma categoria com esse nome')

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
      where: { id },
      select: { id: true, name: true, icon: true, color: true, isDefault: true, userId: true },
    })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')

    const { userId: _, ...result } = category
    return result
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')

    if (category.isDefault && dto.name) {
      throw new ForbiddenException('Categorias padrão não permitem alteração de nome')
    }

    if (dto.name) {
      const existing = await this.prisma.category.findUnique({
        where: { userId_name: { userId, name: dto.name } },
      })
      if (existing && existing.id !== id) {
        throw new ConflictException('Já existe uma categoria com esse nome')
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, icon: true, color: true, isDefault: true },
    })
  }

  async remove(userId: string, id: string, newCategoryId?: string) {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')

    if (category.isDefault) {
      throw new ForbiddenException('Categorias padrão não podem ser removidas')
    }

    const transactionCount = await this.prisma.transaction.count({
      where: { categoryId: id },
    })

    if (transactionCount > 0) {
      if (!newCategoryId) {
        throw new BadRequestException(
          `Existem ${transactionCount} transações vinculadas. Informe newCategoryId para reclassificá-las.`,
        )
      }

      const newCategory = await this.prisma.category.findUnique({
        where: { id: newCategoryId },
      })
      if (!newCategory) throw new NotFoundException('Categoria destino não encontrada')
      if (newCategory.userId !== userId) throw new ForbiddenException('Categoria destino não pertence ao usuário')

      await this.prisma.transaction.updateMany({
        where: { categoryId: id },
        data: { categoryId: newCategoryId },
      })
    }

    await this.prisma.category.delete({ where: { id } })
    return { message: 'Categoria removida com sucesso' }
  }
}