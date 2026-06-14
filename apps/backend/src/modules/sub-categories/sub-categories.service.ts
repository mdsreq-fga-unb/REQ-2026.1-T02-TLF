import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import {
  nullifyRecurrenceSubCategoryRefs,
  nullifyTransactionSubCategoryRefs,
} from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManySubCategoriesDto } from './dto/find-many.dto'
import { SyncSubCategoryDto } from './dto/sync-sub-category.dto'

@Injectable()
export class SubCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManySubCategoriesDto) {
    const { userId, id, categoryId, createdAfter, updatedAfter } = dto

    return this.prisma.subCategory.findMany({
      where: {
        category: { userId },
        ...(id && { id }),
        ...(categoryId && { categoryId }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  private async assertCategoryOwnership(userId: string, categoryId: string) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')
  }

  async syncCreate(userId: string, dto: SyncSubCategoryDto) {
    await this.assertCategoryOwnership(userId, dto.categoryId)
    return this.prisma.subCategory.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        categoryId: dto.categoryId,
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        categoryId: dto.categoryId,
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncSubCategoryDto) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: dto.id },
      include: { category: true },
    })
    if (!subCategory) throw new NotFoundException('Subcategoria não encontrada')
    if (subCategory.category.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.subCategory.update({
      where: { id: dto.id },
      data: {
        categoryId: dto.categoryId,
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(userId: string, id: string) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!subCategory) throw new NotFoundException('Subcategoria não encontrada')
    if (subCategory.category.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await nullifyTransactionSubCategoryRefs(tx, id)
      await nullifyRecurrenceSubCategoryRefs(tx, id)
      await createDeletedRecords(tx, userId, TableName.SUB_CATEGORIES, [id])
      await tx.subCategory.delete({ where: { id } })
    })
  }
}
