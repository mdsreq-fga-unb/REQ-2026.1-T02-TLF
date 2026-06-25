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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkDuplicateName(userId, name, excludeId) {
        const existing = await this.prisma.category.findUnique({
            where: { userId_name: { userId, name } },
        });
        if (existing && existing.id !== excludeId) {
            throw new common_1.ConflictException('Já existe uma categoria com esse nome');
        }
    }
    async reclassify(userId, fromCategoryId, toCategoryId) {
        const newCategory = await this.prisma.category.findUnique({
            where: { id: toCategoryId },
        });
        if (!newCategory)
            throw new common_1.NotFoundException('Categoria destino não encontrada');
        if (newCategory.userId !== userId)
            throw new common_1.ForbiddenException('Categoria destino não pertence ao usuário');
        await Promise.all([
            this.prisma.transaction.updateMany({
                where: { categoryId: fromCategoryId },
                data: { categoryId: toCategoryId },
            }),
            this.prisma.budget.updateMany({
                where: { categoryId: fromCategoryId },
                data: { categoryId: toCategoryId },
            }),
            this.prisma.recurrence.updateMany({
                where: { categoryId: fromCategoryId },
                data: { categoryId: toCategoryId },
            }),
        ]);
    }
    async create(userId, dto) {
        await this.checkDuplicateName(userId, dto.name);
        return this.prisma.category.create({
            data: { ...dto, userId },
            select: { id: true, name: true, icon: true, color: true },
        });
    }
    async findAll(userId) {
        return this.prisma.category.findMany({
            where: { userId },
            select: { id: true, name: true, icon: true, color: true },
        });
    }
    async findOne(userId, id) {
        const category = await this.prisma.category.findUnique({
            where: { id, userId },
            select: { id: true, name: true, icon: true, color: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        return category;
    }
    async update(userId, id, dto, newCategoryId) {
        const category = await this.prisma.category.findUnique({ where: { id, userId } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (dto.name) {
            await this.checkDuplicateName(userId, dto.name, id);
        }
        if (newCategoryId) {
            await this.reclassify(userId, id, newCategoryId);
        }
        return this.prisma.category.update({
            where: { id },
            data: dto,
            select: { id: true, name: true, icon: true, color: true },
        });
    }
    async remove(userId, id, newCategoryId) {
        const category = await this.prisma.category.findUnique({ where: { id, userId } });
        if (!category)
            throw new common_1.NotFoundException('Categoria não encontrada');
        if (newCategoryId) {
            await this.reclassify(userId, id, newCategoryId);
        }
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Categoria removida com sucesso' };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map