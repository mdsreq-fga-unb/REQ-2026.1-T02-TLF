import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import {
  nullifyRecurrenceCategoryRefs,
  nullifyRecurrenceSubCategoryRefs,
  nullifyTransactionCategoryRefs,
  nullifyTransactionSubCategoryRefs,
} from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManyCategoriesDto } from './dto/find-many.dto'
import { SyncCategoryDto } from './dto/sync-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyCategoriesDto) {
    const { userId, id, name, createdAfter, updatedAfter } = dto

    return this.prisma.category.findMany({
      where: {
        userId,
        ...(id && { id }),
        ...(name && { name }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async syncCreate(userId: string, dto: SyncCategoryDto) {
    return this.prisma.category.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        userId,
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id: dto.id } })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.category.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        icon: dto.icon,
        color: dto.color,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(userId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { subCategories: true, budgets: true },
    })
    if (!category) throw new NotFoundException('Categoria não encontrada')
    if (category.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await createDeletedRecords(
        tx,
        userId,
        TableName.BUDGETS,
        category.budgets.map((b) => b.id),
      )
      await tx.budget.deleteMany({ where: { categoryId: id } })

      for (const subCategory of category.subCategories) {
        await nullifyTransactionSubCategoryRefs(tx, subCategory.id)
        await nullifyRecurrenceSubCategoryRefs(tx, subCategory.id)
      }

      await nullifyTransactionCategoryRefs(tx, id)
      await nullifyRecurrenceCategoryRefs(tx, id)

      await createDeletedRecords(
        tx,
        userId,
        TableName.SUB_CATEGORIES,
        category.subCategories.map((s) => s.id),
      )
      await createDeletedRecords(tx, userId, TableName.CATEGORIES, [id])
      await tx.category.delete({ where: { id } })
    })
  }
}
