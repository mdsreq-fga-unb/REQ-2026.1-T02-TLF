import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { Prisma, TransactionType, TransactionStatus } from '../../../generated/prisma/client';

type RecurrenceWithRelations = Prisma.RecurrenceGetPayload<{
  include: {
    account: true;
    category: true;
    subCategory: true;
  };
}>;

const recurrenceInclude = {
  account: true,
  category: true,
  subCategory: true,
} satisfies Prisma.RecurrenceInclude;

@Injectable()
export class RecurrenceService {
  constructor(private readonly prisma: PrismaService) { }

  private formatRecurrence(recurrence: RecurrenceWithRelations) {
    return {
      id: recurrence.id,
      description: recurrence.description ?? undefined,
      amount: recurrence.amount,
      chargeDate: recurrence.chargeDate,
      startDate: recurrence.startDate.toISOString(),
      endDate: recurrence.endDate?.toISOString(),
      isActive: recurrence.isActive,

      category: {
        id: recurrence.category.id,
        name: recurrence.category.name,
      },

      subCategory: recurrence.subCategory
        ? {
          id: recurrence.subCategory.id,
          name: recurrence.subCategory.name,
        }
        : undefined,

      account: {
        id: recurrence.account.id,
        name: recurrence.account.name,
      },
    };
  }

  async create(userId: string, dto: CreateRecurrenceDto) {

    await this.validateAccountOwnership(
      userId,
      dto.accountId,
    );

    await this.validateCategoryOwnership(
      userId,
      dto.categoryId,
    );

    await this.validateSubCategory(
      userId,
      dto.categoryId,
      dto.subCategoryId,
    );

    this.validateDates(dto.startDate, dto.endDate);

    const recurrence = await this.prisma.recurrence.create({
      data: {
        accountId: dto.accountId,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        description: dto.description,
        amount: dto.amount,
        chargeDate: dto.chargeDate,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        isActive: dto.isActive ?? true,
      },
      include: recurrenceInclude,
    });

    return this.formatRecurrence(recurrence);
  }

  async findAll(userId: string, categoryId?: string) {
    const recurrences = await this.prisma.recurrence.findMany({
      where: {
        account: {
          institution: {
            userId,
          },
        },
        ...(categoryId && { categoryId }),
      },
      include: recurrenceInclude,
    });

    return recurrences.map((r) => this.formatRecurrence(r));
  }

  async findOne(userId: string, id: string) {
    const recurrence = await this.getRecurrenceOrThrow(userId, id);
    return this.formatRecurrence(recurrence);
  }

  async update(userId: string, id: string, dto: UpdateRecurrenceDto) {
    await this.getRecurrenceOrThrow(userId, id);

    const updated = await this.prisma.recurrence.update({
      where: { id },
      data: dto,
      include: recurrenceInclude,
    });

    return this.formatRecurrence(updated);
  }

  async remove(userId: string, id: string) {
    await this.getRecurrenceOrThrow(userId, id);

    const deleted = await this.prisma.recurrence.delete({
      where: { id },
      include: recurrenceInclude,
    });

    return this.formatRecurrence(deleted);
  }

  async generateTransactionsFromRecurrences(userId: string) {
    const recurrences = await this.prisma.recurrence.findMany({
      where: {
        isActive: true,
        account: {
          institution: {
            userId,
          },
        },
        startDate: {
          lte: new Date(),
        },
        OR: [
          { endDate: null },
          { endDate: { gte: new Date() } },
        ],
      },
      include: recurrenceInclude,
    });

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const startOfMonth = new Date(year, month, 1);
    const startOfNextMonth = new Date(year, month + 1, 1);

    for (const recurrence of recurrences) {
      const exists = await this.prisma.transaction.findFirst({
        where: {
          recurrenceId: recurrence.id,
          date: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
      });

      if (exists) continue;

      const lastDay = new Date(year, month + 1, 0).getDate();
      const day = Math.min(recurrence.chargeDate, lastDay);
      const date = new Date(year, month, day);
      await this.prisma.transaction.create({
        data: {
          accountId: recurrence.accountId,
          categoryId: recurrence.categoryId,
          subCategoryId: recurrence.subCategoryId,
          amount: recurrence.amount,
          description: recurrence.description,
          type: TransactionType.EXPENSE,
          status: TransactionStatus.COMPLETED,
          date,
          recurrenceId: recurrence.id,
        },
      });
    }
  }

  private async validateAccountOwnership(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: {
        institution: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    if (account.institution.userId !== userId) {
      throw new ForbiddenException('Conta não pertence ao usuário');
    }

    return account;
  }

  private async validateCategoryOwnership(userId: string, categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Categoria não pertence ao usuário');
    }

    return category;
  }

  private async validateSubCategory(
    userId: string,
    categoryId: string,
    subCategoryId?: string,
  ) {
    if (!subCategoryId) {
      return null;
    }

    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId },
      include: { category: true },
    });

    if (!subCategory) {
      throw new NotFoundException('Subcategoria não encontrada')
    }

    if (subCategory.category.userId !== userId) {
      throw new ForbiddenException('Subcategoria não pertence ao usuário');
    }

    if (subCategory.categoryId !== categoryId) {
      throw new BadRequestException('Subcategoria não pertence à categoria informada')
    }
    return subCategory;
  }

  private validateDates(
    startDate: string,
    endDate?: string,
  ) {
    if (endDate && new Date(endDate) < new Date(startDate)) {
      throw new BadRequestException(
        'Data final não pode ser menor que a data inicial'
      );
    }
  }

  private async getRecurrenceOrThrow(userId: string, id: string) {
    const recurrence = await this.prisma.recurrence.findUnique({
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
    });

    if (!recurrence) {
      throw new NotFoundException('Recorrência não encontrada');
    }

    if (recurrence.account.institution.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a esta recorrência');
    }

    return recurrence;
  }

}
