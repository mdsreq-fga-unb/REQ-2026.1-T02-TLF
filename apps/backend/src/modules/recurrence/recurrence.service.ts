import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';

@Injectable()
export class RecurrenceService {
  constructor(private readonly prisma: PrismaService) { }

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

    return this.prisma.recurrence.create({
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
      include: {
        account: true,
        category: true,
        subCategory: true,
      },
    });
  }

  findAll(userId: string, categoryId?: string) {
    return this.prisma.recurrence.findMany({
      where: {
        account: {
          institution: {
            userId,
          },
        },
        ...(categoryId && {categoryId}),
      },
      include: {
        category: true,
        subCategory: true,
        account: true,
      }
    });
  }

  async findOne(userId: string, id: string) {
    return this.getRecurrenceOrThrow(userId, id);
  }

  async update(userId: string, id: string, dto: UpdateRecurrenceDto) {
    await this.getRecurrenceOrThrow(userId, id);

    return this.prisma.recurrence.update({
      where: { id },
      data: dto,
      include: {
       account: true,
       category: true,
       subCategory: true, 
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.getRecurrenceOrThrow(userId, id);

    return this.prisma.recurrence.delete({
      where: { id },
    });
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
