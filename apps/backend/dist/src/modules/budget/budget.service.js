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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let BudgetService = class BudgetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getBudgetPeriod(month, year) {
        return {
            start: new Date(Date.UTC(year, month - 1, 1)),
            end: new Date(Date.UTC(year, month, 1)),
        };
    }
    async getBudgetSpentValue(userId, categoryId, month, year) {
        const { start, end } = this.getBudgetPeriod(month, year);
        const result = await this.prisma.transaction.aggregate({
            where: {
                type: client_1.TransactionType.EXPENSE,
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
        });
        return result._sum.amount ?? 0;
    }
    normalizeBudget(budget) {
        const { userId: _, ...result } = budget;
        return result;
    }
    async attachBudgetSummary(budget, userId) {
        const normalizedBudget = this.normalizeBudget(budget);
        const spentValue = await this.getBudgetSpentValue(userId ?? budget.userId ?? '', normalizedBudget.categoryId, normalizedBudget.month, normalizedBudget.year);
        const remainingValue = normalizedBudget.amountLimit - spentValue;
        const spentPercentage = normalizedBudget.amountLimit > 0
            ? Math.round((spentValue / normalizedBudget.amountLimit) * 100)
            : 0;
        return {
            ...normalizedBudget,
            spentValue,
            remainingValue,
            spentPercentage,
        };
    }
    async attachBudgetsSummary(budgets, userId) {
        return Promise.all(budgets.map((budget) => this.attachBudgetSummary(budget, userId)));
    }
    async findMany(dto) {
        const { userId, id, categoryId, month, year, createdAfter, updatedAfter } = dto;
        const budgets = await this.prisma.budget.findMany({
            where: {
                userId,
                ...(id && { id }),
                ...(categoryId && { categoryId }),
                ...(month !== undefined && { month }),
                ...(year !== undefined && { year }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
        return this.attachBudgetsSummary(budgets, userId);
    }
    async create(userId, dto) {
        const category = await this.prisma.category.findUnique({
            where: { id: dto.categoryId },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (category.userId !== userId)
            throw new common_1.ForbiddenException('Categoria não pertence ao usuário');
        const existing = await this.prisma.budget.findUnique({
            where: {
                userId_categoryId_month_year: {
                    userId,
                    categoryId: dto.categoryId,
                    month: dto.month,
                    year: dto.year,
                },
            },
        });
        if (existing)
            throw new common_1.ConflictException('Orçamento já existe para essa categoria/mês/ano');
        const budget = await this.prisma.budget.create({
            data: { ...dto, userId },
            select: {
                id: true,
                name: true,
                amountLimit: true,
                month: true,
                year: true,
                categoryId: true,
                category: { select: { id: true, name: true, color: true, icon: true } },
            },
        });
        return this.attachBudgetSummary(budget, userId);
    }
    async findAll(userId) {
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
        });
        return this.attachBudgetsSummary(budgets, userId);
    }
    async findOne(userId, id) {
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
        });
        if (!budget)
            throw new common_1.NotFoundException('Orçamento não encontrado');
        if (budget.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.attachBudgetSummary(budget, userId);
    }
    async findByCategory(userId, categoryId) {
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
        });
        return this.attachBudgetsSummary(budgets, userId);
    }
    async update(userId, id, dto) {
        const budget = await this.prisma.budget.findUnique({ where: { id } });
        if (!budget)
            throw new common_1.NotFoundException('Orçamento não encontrado');
        if (budget.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
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
        });
        return this.attachBudgetSummary(updatedBudget, userId);
    }
    async syncCreate(userId, dto) {
        const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (category.userId !== userId)
            throw new common_1.ForbiddenException('Categoria não pertence ao usuário');
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
        });
        return this.attachBudgetSummary(budget, userId);
    }
    async syncUpdate(userId, dto) {
        const budget = await this.prisma.budget.findUnique({ where: { id: dto.id } });
        if (!budget)
            throw new common_1.NotFoundException('Orçamento não encontrado');
        if (budget.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
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
        });
        return this.attachBudgetSummary(updatedBudget, userId);
    }
    async remove(dto) {
        const { userId, id } = dto;
        const budget = await this.prisma.budget.findUnique({ where: { id } });
        if (!budget)
            throw new common_1.NotFoundException('Orçamento não encontrado');
        if (budget.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, deleted_record_util_1.createDeletedRecords)({ tx, userId, tableName: client_1.TableName.BUDGETS, recordIds: [id] });
            await tx.budget.delete({ where: { id } });
        });
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetService);
//# sourceMappingURL=budget.service.js.map