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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, institutionId, isActive, createdAfter, updatedAfter } = dto;
        return this.prisma.account.findMany({
            where: {
                institution: { userId },
                ...(id && { id }),
                ...(institutionId && { institutionId }),
                ...(isActive !== undefined && { isActive }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async assertInstitutionOwnership(userId, institutionId) {
        const institution = await this.prisma.institution.findUnique({ where: { id: institutionId } });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        if (institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
    }
    async deleteAccountInTransaction(dto) {
        const { tx, userId, accountId, invoiceIds, recurrenceIds } = dto;
        await Promise.all([
            (0, deleted_record_util_1.createDeletedRecords)({ tx, userId, tableName: client_1.TableName.INVOICES, recordIds: invoiceIds }),
            (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.RECURRENCES,
                recordIds: recurrenceIds,
            }),
            (0, deleted_record_util_1.createDeletedRecords)({ tx, userId, tableName: client_1.TableName.ACCOUNTS, recordIds: [accountId] }),
        ]);
        await tx.account.delete({ where: { id: accountId } });
    }
    async syncCreate(userId, dto) {
        await this.assertInstitutionOwnership(userId, dto.institutionId);
        return this.prisma.account.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                institutionId: dto.institutionId,
                name: dto.name,
                type: dto.type ?? client_1.AccountType.CHECKING,
                balance: dto.balance ?? 0,
                closingDay: dto.closingDay ?? null,
                dueDay: dto.dueDay ?? null,
                creditLimit: dto.creditLimit ?? 0,
                currency: dto.currency ?? client_1.Currency.BRL,
                isActive: dto.isActive ?? true,
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                institutionId: dto.institutionId,
                name: dto.name,
                type: dto.type,
                balance: dto.balance,
                closingDay: dto.closingDay ?? null,
                dueDay: dto.dueDay ?? null,
                creditLimit: dto.creditLimit ?? 0,
                currency: dto.currency,
                isActive: dto.isActive,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        const account = await this.prisma.account.findUnique({
            where: { id: dto.id },
            include: { institution: true },
        });
        if (!account)
            throw new common_1.NotFoundException('Conta não encontrada');
        if (account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.account.update({
            where: { id: dto.id },
            data: {
                institutionId: dto.institutionId,
                name: dto.name,
                type: dto.type,
                balance: dto.balance,
                closingDay: dto.closingDay ?? null,
                dueDay: dto.dueDay ?? null,
                creditLimit: dto.creditLimit ?? 0,
                currency: dto.currency,
                isActive: dto.isActive,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id: accountId } = dto;
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: {
                institution: true,
                invoices: true,
                recurrences: true,
            },
        });
        if (!account)
            throw new common_1.NotFoundException('Conta não encontrada');
        if (account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await this.deleteAccountInTransaction({
                tx,
                userId,
                accountId,
                invoiceIds: account.invoices.map((i) => i.id),
                recurrenceIds: account.recurrences.map((r) => r.id),
            });
        });
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map