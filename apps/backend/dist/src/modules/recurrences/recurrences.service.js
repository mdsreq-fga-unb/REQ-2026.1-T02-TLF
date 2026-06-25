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
exports.RecurrencesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const set_null_util_1 = require("../../common/sync/set-null.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let RecurrencesService = class RecurrencesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, accountId, categoryId, isActive, createdAfter, updatedAfter } = dto;
        return this.prisma.recurrence.findMany({
            where: {
                account: { institution: { userId } },
                ...(id && { id }),
                ...(accountId && { accountId }),
                ...(categoryId && { categoryId }),
                ...(isActive !== undefined && { isActive }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async assertAccountOwnership(userId, accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: { institution: true },
        });
        if (!account)
            throw new common_1.NotFoundException('Conta não encontrada');
        if (account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
    }
    async syncCreate(userId, dto) {
        await this.assertAccountOwnership(userId, dto.accountId);
        return this.prisma.recurrence.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                accountId: dto.accountId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                description: dto.description,
                amount: dto.amount,
                isActive: dto.isActive ?? true,
                chargeDate: dto.chargeDate,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                accountId: dto.accountId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                description: dto.description,
                amount: dto.amount,
                isActive: dto.isActive,
                chargeDate: dto.chargeDate,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        const recurrence = await this.prisma.recurrence.findUnique({
            where: { id: dto.id },
            include: { account: { include: { institution: true } } },
        });
        if (!recurrence)
            throw new common_1.NotFoundException('Recorrência não encontrada');
        if (recurrence.account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.recurrence.update({
            where: { id: dto.id },
            data: {
                accountId: dto.accountId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                description: dto.description,
                amount: dto.amount,
                isActive: dto.isActive,
                chargeDate: dto.chargeDate,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id: recurrenceId } = dto;
        const recurrence = await this.prisma.recurrence.findUnique({
            where: { id: recurrenceId },
            include: { account: { include: { institution: true } } },
        });
        if (!recurrence)
            throw new common_1.NotFoundException('Recorrência não encontrada');
        if (recurrence.account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, set_null_util_1.nullifyTransactionRecurrenceRefs)(tx, recurrenceId);
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.RECURRENCES,
                recordIds: [recurrenceId],
            });
            await tx.recurrence.delete({ where: { id: recurrenceId } });
        });
    }
};
exports.RecurrencesService = RecurrencesService;
exports.RecurrencesService = RecurrencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecurrencesService);
//# sourceMappingURL=recurrences.service.js.map