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
exports.InstitutionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const set_null_util_1 = require("../../common/sync/set-null.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const accounts_service_1 = require("../accounts/accounts.service");
const client_1 = require("../../../generated/prisma/client");
let InstitutionsService = class InstitutionsService {
    constructor(prisma, accountsService) {
        this.prisma = prisma;
        this.accountsService = accountsService;
    }
    findMany(dto) {
        const { userId, id, createdAfter, updatedAfter } = dto;
        return this.prisma.institution.findMany({
            where: {
                userId,
                ...(id && { id }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async syncCreate(userId, dto) {
        return this.prisma.institution.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                userId,
                name: dto.name,
                color: dto.color,
                ...(dto.icon !== undefined && { icon: dto.icon }),
                ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                name: dto.name,
                color: dto.color,
                ...(dto.icon !== undefined && { icon: dto.icon }),
                ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        const institution = await this.prisma.institution.findUnique({ where: { id: dto.id } });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        if (institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.institution.update({
            where: { id: dto.id },
            data: {
                name: dto.name,
                color: dto.color,
                ...(dto.icon !== undefined && { icon: dto.icon }),
                ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id: institutionId } = dto;
        const institution = await this.prisma.institution.findUnique({
            where: { id: institutionId },
            include: {
                accounts: {
                    include: {
                        invoices: true,
                        recurrences: true,
                    },
                },
                transactions: true,
            },
        });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        if (institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            for (const account of institution.accounts) {
                await this.accountsService.deleteAccountInTransaction({
                    tx,
                    userId,
                    accountId: account.id,
                    invoiceIds: account.invoices.map((i) => i.id),
                    recurrenceIds: account.recurrences.map((r) => r.id),
                });
            }
            await (0, set_null_util_1.nullifyTransactionDestinationInstitutionRefs)(tx, institutionId);
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.TRANSACTIONS,
                recordIds: institution.transactions.map((transaction) => transaction.id),
            });
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.INSTITUTIONS,
                recordIds: [institutionId],
            });
            for (const transaction of institution.transactions) {
                await tx.transaction.delete({ where: { id: transaction.id } });
            }
            await tx.institution.delete({ where: { id: institutionId } });
        });
    }
};
exports.InstitutionsService = InstitutionsService;
exports.InstitutionsService = InstitutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        accounts_service_1.AccountsService])
], InstitutionsService);
//# sourceMappingURL=institutions.service.js.map