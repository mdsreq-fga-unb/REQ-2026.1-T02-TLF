"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RecurrenceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const recurrence_apply_scope_enum_1 = require("./enums/recurrence-apply-scope.enum");
const client_1 = require("../../../generated/prisma/client");
const recurrence_delete_scope_enum_1 = require("./enums/recurrence-delete-scope.enum");
const recurrenceInclude = {
    account: {
        include: {
            institution: true,
        },
    },
    category: true,
    subCategory: true,
};
let RecurrenceService = RecurrenceService_1 = class RecurrenceService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(RecurrenceService_1.name);
    }
    mapBase(recurrence) {
        return {
            id: recurrence.id,
            description: recurrence.description,
            amount: recurrence.amount,
            chargeDate: recurrence.chargeDate,
            startDate: recurrence.startDate.toISOString(),
            endDate: recurrence.endDate?.toISOString(),
            isActive: recurrence.isActive,
            category: recurrence.category
                ? {
                    id: recurrence.category.id,
                    name: recurrence.category.name,
                }
                : undefined,
            account: {
                id: recurrence.account.id,
                name: recurrence.account.name,
            },
        };
    }
    toDetail(recurrence) {
        return {
            ...this.mapBase(recurrence),
            subCategory: recurrence.subCategory
                ? {
                    id: recurrence.subCategory.id,
                    name: recurrence.subCategory.name,
                }
                : undefined,
        };
    }
    async create(userId, dto) {
        await this.validateAccountOwnership(userId, dto.accountId);
        await this.validateCategoryOwnership(userId, dto.categoryId);
        await this.validateSubCategory(userId, dto.categoryId, dto.subCategoryId);
        this.validateDates(new Date(dto.startDate), dto.endDate ? new Date(dto.endDate) : undefined);
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
        return this.toDetail(recurrence);
    }
    async findAll(userId, query) {
        const { categoryId, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const [recurrences, total] = await this.prisma.$transaction([
            this.prisma.recurrence.findMany({
                where: {
                    account: {
                        institution: {
                            userId,
                        },
                    },
                    ...(categoryId && { categoryId }),
                },
                include: recurrenceInclude,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.recurrence.count({
                where: {
                    account: {
                        institution: {
                            userId,
                        },
                    },
                    ...(categoryId && { categoryId }),
                },
            }),
        ]);
        return {
            data: recurrences.map((r) => this.mapBase(r)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(userId, id) {
        const recurrence = await this.getRecurrenceOrThrow(userId, id);
        return this.toDetail(recurrence);
    }
    async update(userId, id, dto) {
        const recurrence = await this.getRecurrenceOrThrow(userId, id);
        const scope = dto.applyScope ?? recurrence_apply_scope_enum_1.RecurrenceApplyScope.THIS;
        const categoryId = dto.categoryId ?? recurrence.categoryId;
        if (dto.accountId !== undefined) {
            await this.validateAccountOwnership(userId, dto.accountId);
        }
        if (dto.categoryId !== undefined) {
            await this.validateCategoryOwnership(userId, dto.categoryId);
        }
        if (dto.subCategoryId !== undefined) {
            if (!categoryId) {
                throw new common_1.BadRequestException('Subcategoria requer uma categoria');
            }
            await this.validateSubCategory(userId, categoryId, dto.subCategoryId);
        }
        const nextStartDate = dto.startDate ? new Date(dto.startDate) : recurrence.startDate;
        const nextEndDate = dto.endDate !== undefined ? (dto.endDate ? new Date(dto.endDate) : null) : recurrence.endDate;
        this.validateDates(nextStartDate, nextEndDate ?? undefined);
        const result = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.recurrence.update({
                where: { id },
                data: {
                    account: dto.accountId ? { connect: { id: dto.accountId } } : undefined,
                    category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,
                    subCategory: dto.subCategoryId !== undefined
                        ? dto.subCategoryId
                            ? { connect: { id: dto.subCategoryId } }
                            : { disconnect: true }
                        : undefined,
                    description: dto.description,
                    amount: dto.amount,
                    chargeDate: dto.chargeDate,
                    startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                    endDate: dto.endDate !== undefined ? (dto.endDate ? new Date(dto.endDate) : null) : undefined,
                    isActive: dto.isActive,
                },
                include: recurrenceInclude,
            });
            if (scope === recurrence_apply_scope_enum_1.RecurrenceApplyScope.ALL) {
                const [transactionCount, hasCompleted] = await Promise.all([
                    tx.transaction.count({
                        where: { recurrenceId: id },
                    }),
                    tx.transaction.findFirst({
                        where: {
                            recurrenceId: id,
                            status: client_1.TransactionStatus.COMPLETED,
                        },
                        select: { id: true },
                    }),
                ]);
                if (hasCompleted) {
                    throw new common_1.BadRequestException('Não é possível aplicar alterações globais com transações concluídas');
                }
                const changedStart = dto.startDate && new Date(dto.startDate).getTime() !== recurrence.startDate.getTime();
                const changedEnd = dto.endDate !== undefined &&
                    (dto.endDate ? new Date(dto.endDate).getTime() : null) !==
                        (recurrence.endDate ? recurrence.endDate.getTime() : null);
                const changedChargeDate = dto.chargeDate && dto.chargeDate !== recurrence.chargeDate;
                if ((changedStart || changedEnd) && transactionCount > 0) {
                    throw new common_1.BadRequestException('Não é possível alterar período pois já existem transações geradas');
                }
                if (changedChargeDate && transactionCount > 0) {
                    throw new common_1.BadRequestException('Não é possível alterar o dia de cobrança com transações já geradas');
                }
                await tx.transaction.updateMany({
                    where: {
                        recurrenceId: id,
                        status: {
                            not: client_1.TransactionStatus.COMPLETED,
                        },
                    },
                    data: {
                        amount: dto.amount ?? recurrence.amount,
                        categoryId: dto.categoryId ?? recurrence.categoryId,
                        subCategoryId: dto.subCategoryId ?? recurrence.subCategoryId,
                        description: dto.description ?? recurrence.description,
                    },
                });
            }
            if (scope === recurrence_apply_scope_enum_1.RecurrenceApplyScope.FUTURE) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const futureTransactions = await tx.transaction.findMany({
                    where: {
                        recurrenceId: id,
                        date: {
                            gte: recurrence.startDate > today ? recurrence.startDate : today,
                        },
                    },
                    orderBy: {
                        date: 'asc',
                    },
                });
                const hasCompletedFuture = futureTransactions.some((t) => t.status === client_1.TransactionStatus.COMPLETED);
                if (hasCompletedFuture) {
                    throw new common_1.BadRequestException('Não é possível alterar recorrência com transações futuras já concluídas');
                }
                const hasAnyFuture = futureTransactions.length > 0;
                const changedCriticalFields = dto.startDate ||
                    dto.endDate !== undefined ||
                    dto.chargeDate !== undefined ||
                    dto.categoryId ||
                    dto.subCategoryId;
                if (changedCriticalFields && hasAnyFuture) {
                    throw new common_1.BadRequestException('Alterações estruturais não podem ser aplicadas pois já existem transações futuras geradas');
                }
                await tx.recurrence.update({
                    where: { id },
                    data: {
                        categoryId: dto.categoryId ?? undefined,
                        subCategoryId: dto.subCategoryId ?? undefined,
                        description: dto.description ?? undefined,
                        amount: dto.amount ?? undefined,
                        chargeDate: dto.chargeDate ?? undefined,
                        isActive: dto.isActive ?? undefined,
                    },
                });
            }
            return updated;
        });
        return this.toDetail(result);
    }
    async remove(userId, id, dto) {
        const recurrence = await this.getRecurrenceOrThrow(userId, id);
        const scope = dto?.scope ?? recurrence_delete_scope_enum_1.RecurrenceDeleteScope.THIS;
        const result = await this.prisma.$transaction(async (tx) => {
            if (scope === recurrence_delete_scope_enum_1.RecurrenceDeleteScope.THIS) {
                const deleted = await tx.recurrence.delete({
                    where: { id },
                    include: recurrenceInclude,
                });
                return deleted;
            }
            if (scope === recurrence_delete_scope_enum_1.RecurrenceDeleteScope.FUTURE) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                await tx.transaction.deleteMany({
                    where: {
                        recurrenceId: id,
                        date: {
                            gte: recurrence.startDate > today ? recurrence.startDate : today,
                        },
                        status: {
                            not: client_1.TransactionStatus.COMPLETED,
                        },
                    },
                });
                const updated = await tx.recurrence.update({
                    where: { id },
                    data: {
                        endDate: new Date(today.getTime() - 1),
                        isActive: false,
                    },
                    include: recurrenceInclude,
                });
                return updated;
            }
            if (scope === recurrence_delete_scope_enum_1.RecurrenceDeleteScope.ALL) {
                await tx.transaction.deleteMany({
                    where: {
                        recurrenceId: id,
                    },
                });
                const deleted = await tx.recurrence.delete({
                    where: { id },
                    include: recurrenceInclude,
                });
                return deleted;
            }
            throw new common_1.BadRequestException('Scope inválido para exclusão de recorrência');
        });
        return this.toDetail(result);
    }
    async generateTransactionsFromRecurrences() {
        const now = new Date();
        this.logger.log(`Recurrence job started at ${now.toISOString()}`);
        const recurrences = await this.prisma.recurrence.findMany({
            where: {
                isActive: true,
                startDate: { lte: now },
                OR: [{ endDate: null }, { endDate: { gte: now } }],
            },
            include: recurrenceInclude,
        });
        this.logger.log(`Found ${recurrences.length} active recurrences`);
        const month = now.getMonth();
        const year = now.getFullYear();
        const startOfMonth = new Date(year, month, 1);
        const startOfNextMonth = new Date(year, month + 1, 1);
        const existingTransactions = await this.prisma.transaction.findMany({
            where: {
                recurrenceId: {
                    in: recurrences.map((r) => r.id),
                },
                date: {
                    gte: startOfMonth,
                    lt: startOfNextMonth,
                },
            },
            select: {
                recurrenceId: true,
            },
        });
        const existingSet = new Set(existingTransactions.map((t) => t.recurrenceId));
        const toCreate = recurrences.filter((r) => !existingSet.has(r.id));
        await this.prisma.transaction.createMany({
            data: toCreate.map((recurrence) => {
                const lastDay = new Date(year, month + 1, 0).getDate();
                const day = Math.min(recurrence.chargeDate, lastDay);
                return {
                    institutionId: recurrence.account.institution.id,
                    categoryId: recurrence.categoryId,
                    subCategoryId: recurrence.subCategoryId,
                    amount: recurrence.amount,
                    description: recurrence.description,
                    type: client_1.TransactionType.EXPENSE,
                    status: client_1.TransactionStatus.PENDING,
                    date: new Date(year, month, day),
                    recurrenceId: recurrence.id,
                };
            }),
        });
        this.logger.log(`Created ${toCreate.length} transactions for current month`);
        this.logger.log('Recurrence job finished successfully');
    }
    async validateAccountOwnership(userId, accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: {
                institution: true,
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Conta não encontrada');
        }
        if (account.institution.userId !== userId) {
            throw new common_1.ForbiddenException('Conta não pertence ao usuário');
        }
        return account;
    }
    async validateCategoryOwnership(userId, categoryId) {
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada');
        }
        if (category.userId !== userId) {
            throw new common_1.ForbiddenException('Categoria não pertence ao usuário');
        }
        return category;
    }
    async validateSubCategory(userId, categoryId, subCategoryId) {
        if (!subCategoryId) {
            return null;
        }
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id: subCategoryId },
            include: { category: true },
        });
        if (!subCategory) {
            throw new common_1.NotFoundException('Subcategoria não encontrada');
        }
        if (subCategory.category.userId !== userId) {
            throw new common_1.ForbiddenException('Subcategoria não pertence ao usuário');
        }
        if (subCategory.categoryId !== categoryId) {
            throw new common_1.BadRequestException('Subcategoria não pertence à categoria informada');
        }
        return subCategory;
    }
    validateDates(startDate, endDate) {
        if (endDate && endDate < startDate) {
            throw new common_1.BadRequestException('Data final não pode ser menor que a data inicial');
        }
    }
    async getRecurrenceOrThrow(userId, id) {
        const recurrence = await this.prisma.recurrence.findUnique({
            where: { id },
            include: recurrenceInclude,
        });
        if (!recurrence) {
            throw new common_1.NotFoundException('Recorrência não encontrada');
        }
        if (recurrence.account.institution.userId !== userId) {
            throw new common_1.ForbiddenException('Você não tem acesso a esta recorrência');
        }
        return recurrence;
    }
};
exports.RecurrenceService = RecurrenceService;
exports.RecurrenceService = RecurrenceService = RecurrenceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecurrenceService);
//# sourceMappingURL=recurrence.service.js.map