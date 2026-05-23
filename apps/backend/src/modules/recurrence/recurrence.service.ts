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

  findAll() {
    return `This action returns all recurrence`;
  }

  findOne(id: string) {
    return `This action returns a #${id} recurrence`;
  }

  update(id: string, updateRecurrenceDto: UpdateRecurrenceDto) {
    return `This action updates a #${id} recurrence`;
  }

  remove(id: string) {
    return `This action removes a #${id} recurrence`;
  }

  private async validateAccountOwnership(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: {id: accountId},
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
}
