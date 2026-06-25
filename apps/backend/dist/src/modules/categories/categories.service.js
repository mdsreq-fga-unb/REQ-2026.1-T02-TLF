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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const set_null_util_1 = require("../../common/sync/set-null.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, name, createdAfter, updatedAfter } = dto;
        return this.prisma.category.findMany({
            where: {
                userId,
                ...(id && { id }),
                ...(name && { name }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async syncCreate(userId, dto) {
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
        });
    }
    async syncUpdate(userId, dto) {
        const category = await this.prisma.category.findUnique({ where: { id: dto.id } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (category.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.category.update({
            where: { id: dto.id },
            data: {
                name: dto.name,
                icon: dto.icon,
                color: dto.color,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id } = dto;
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { subCategories: true, budgets: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (category.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.BUDGETS,
                recordIds: category.budgets.map((b) => b.id),
            });
            await tx.budget.deleteMany({ where: { categoryId: id } });
            for (const subCategory of category.subCategories) {
                await (0, set_null_util_1.nullifyTransactionSubCategoryRefs)(tx, subCategory.id);
                await (0, set_null_util_1.nullifyRecurrenceSubCategoryRefs)(tx, subCategory.id);
            }
            await (0, set_null_util_1.nullifyTransactionCategoryRefs)(tx, id);
            await (0, set_null_util_1.nullifyRecurrenceCategoryRefs)(tx, id);
            await Promise.all([
                (0, deleted_record_util_1.createDeletedRecords)({
                    tx,
                    userId,
                    tableName: client_1.TableName.SUB_CATEGORIES,
                    recordIds: category.subCategories.map((s) => s.id),
                }),
                (0, deleted_record_util_1.createDeletedRecords)({
                    tx,
                    userId,
                    tableName: client_1.TableName.CATEGORIES,
                    recordIds: [id],
                }),
            ]);
            await tx.category.delete({ where: { id } });
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map