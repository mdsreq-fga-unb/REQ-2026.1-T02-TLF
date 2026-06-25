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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const set_null_util_1 = require("../../common/sync/set-null.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let InvoiceService = class InvoiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, accountId, status, referenceMonth, referenceYear, createdAfter, updatedAfter, } = dto;
        return this.prisma.invoice.findMany({
            where: {
                account: { institution: { userId } },
                ...(id && { id }),
                ...(accountId && { accountId }),
                ...(status && { status }),
                ...(referenceMonth !== undefined && { referenceMonth }),
                ...(referenceYear !== undefined && { referenceYear }),
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
        return this.prisma.invoice.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                accountId: dto.accountId,
                status: dto.status ?? client_1.InvoiceStatus.OPEN,
                paymentStatus: dto.paymentStatus ?? client_1.InvoicePaymentStatus.NOT_PAID,
                referenceMonth: dto.referenceMonth,
                referenceYear: dto.referenceYear,
                totalAmount: dto.totalAmount ?? 0,
                paidAmount: dto.paidAmount ?? 0,
                closingDay: dto.closingDay,
                dueDay: dto.dueDay,
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                accountId: dto.accountId,
                status: dto.status,
                paymentStatus: dto.paymentStatus,
                referenceMonth: dto.referenceMonth,
                referenceYear: dto.referenceYear,
                totalAmount: dto.totalAmount,
                paidAmount: dto.paidAmount,
                closingDay: dto.closingDay,
                dueDay: dto.dueDay,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: dto.id },
            include: { account: { include: { institution: true } } },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Fatura não encontrada');
        if (invoice.account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.invoice.update({
            where: { id: dto.id },
            data: {
                accountId: dto.accountId,
                status: dto.status,
                paymentStatus: dto.paymentStatus,
                referenceMonth: dto.referenceMonth,
                referenceYear: dto.referenceYear,
                totalAmount: dto.totalAmount,
                paidAmount: dto.paidAmount,
                closingDay: dto.closingDay,
                dueDay: dto.dueDay,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id: invoiceId } = dto;
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: invoiceId },
            include: { account: { include: { institution: true } } },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Fatura não encontrada');
        if (invoice.account.institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, set_null_util_1.nullifyTransactionInvoiceRefs)(tx, invoiceId);
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.INVOICES,
                recordIds: [invoiceId],
            });
            await tx.invoice.delete({ where: { id: invoiceId } });
        });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map