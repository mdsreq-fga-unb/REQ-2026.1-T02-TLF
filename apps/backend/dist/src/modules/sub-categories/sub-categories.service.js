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
exports.SubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const set_null_util_1 = require("../../common/sync/set-null.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let SubCategoriesService = class SubCategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, categoryId, createdAfter, updatedAfter } = dto;
        return this.prisma.subCategory.findMany({
            where: {
                category: { userId },
                ...(id && { id }),
                ...(categoryId && { categoryId }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async assertCategoryOwnership(userId, categoryId) {
        const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (category.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
    }
    async syncCreate(userId, dto) {
        await this.assertCategoryOwnership(userId, dto.categoryId);
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
        });
    }
    async syncUpdate(userId, dto) {
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id: dto.id },
            include: { category: true },
        });
        if (!subCategory)
            throw new common_1.NotFoundException('Subcategoria não encontrada');
        if (subCategory.category.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.subCategory.update({
            where: { id: dto.id },
            data: {
                categoryId: dto.categoryId,
                name: dto.name,
                icon: dto.icon,
                color: dto.color,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id } = dto;
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!subCategory)
            throw new common_1.NotFoundException('Subcategoria não encontrada');
        if (subCategory.category.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, set_null_util_1.nullifyTransactionSubCategoryRefs)(tx, id);
            await (0, set_null_util_1.nullifyRecurrenceSubCategoryRefs)(tx, id);
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.SUB_CATEGORIES,
                recordIds: [id],
            });
            await tx.subCategory.delete({ where: { id } });
        });
    }
};
exports.SubCategoriesService = SubCategoriesService;
exports.SubCategoriesService = SubCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubCategoriesService);
//# sourceMappingURL=sub-categories.service.js.map