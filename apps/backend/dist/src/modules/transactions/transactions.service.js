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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, institutionId, categoryId, type, status, createdAfter, updatedAfter } = dto;
        return this.prisma.transaction.findMany({
            where: {
                institution: { userId },
                ...(id && { id }),
                ...(institutionId && { institutionId }),
                ...(categoryId && { categoryId }),
                ...(type && { type }),
                ...(status && { status }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async create(userId, dto) {
        const category = await this.prisma.category.findUnique({
            where: { id: dto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada');
        }
        if (category.userId !== userId) {
            throw new common_1.BadRequestException('Categoria não pertence ao usuário');
        }
        if (dto.subCategoryId) {
            const subCategory = await this.prisma.subCategory.findUnique({
                where: { id: dto.subCategoryId },
            });
            if (!subCategory || subCategory.categoryId !== dto.categoryId) {
                throw new common_1.BadRequestException('Subcategoria inválida');
            }
        }
        await this.assertTransactionRelations(userId, {
            institutionId: dto.institutionId,
            invoiceId: dto.invoiceId,
            recurrenceId: dto.recurrenceId,
            destinationInstitutionId: dto.destinationInstitutionId,
        });
        const transaction = await this.prisma.transaction.create({
            data: {
                ...(dto.id && { id: dto.id }),
                institutionId: dto.institutionId,
                categoryId: dto.categoryId,
                subCategoryId: dto.subCategoryId,
                type: dto.type,
                amount: dto.amount,
                description: dto.description,
                date: dto.date ? new Date(dto.date) : new Date(),
                status: dto.status,
                invoiceId: dto.invoiceId,
                recurrenceId: dto.recurrenceId,
                destinationInstitutionId: dto.destinationInstitutionId,
            },
            include: {
                category: true,
                subCategory: true,
                institution: true,
            },
        });
        return this.formatTransaction(transaction);
    }
    async getTransactionOrThrow(userId, id) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                institution: true,
                category: true,
                subCategory: true,
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transação não encontrada');
        }
        if (transaction.institution.userId !== userId) {
            throw new common_1.ForbiddenException('Você não tem acesso a esta transação');
        }
        return transaction;
    }
    async findAll(userId, query) {
        const { institutionId, categoryId, type, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.transaction.findMany({
                where: {
                    institution: { userId },
                    ...(institutionId && { institutionId }),
                    ...(categoryId && { categoryId }),
                    ...(type && { type }),
                },
                skip,
                take: limit,
                orderBy: {
                    date: 'desc',
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    subCategory: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    institution: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            this.prisma.transaction.count({
                where: {
                    institution: { userId },
                    ...(institutionId && { institutionId }),
                    ...(categoryId && { categoryId }),
                    ...(type && { type }),
                },
            }),
        ]);
        const formattedData = data.map((t) => this.formatTransaction(t));
        return {
            data: formattedData,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne({ userId, id }) {
        const transaction = await this.getTransactionOrThrow(userId, id);
        return this.formatTransaction(transaction);
    }
    async update({ userId, id, dto }) {
        const current = await this.getTransactionOrThrow(userId, id);
        const nextInstitutionId = dto.institutionId ?? current.institutionId;
        const nextInvoiceId = dto.invoiceId ?? current.invoiceId;
        const nextRecurrenceId = dto.recurrenceId ?? current.recurrenceId;
        const nextDestinationInstitutionId = dto.destinationInstitutionId ?? current.destinationInstitutionId;
        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: dto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Categoria não encontrada');
            }
            if (category.userId !== userId) {
                throw new common_1.BadRequestException('Categoria não pertence ao usuário');
            }
        }
        if (dto.subCategoryId) {
            const subCategory = await this.prisma.subCategory.findUnique({
                where: { id: dto.subCategoryId },
            });
            if (!subCategory || (dto.categoryId ?? current.categoryId) !== subCategory.categoryId) {
                throw new common_1.BadRequestException('Subcategoria inválida');
            }
        }
        await this.assertTransactionRelations(userId, {
            institutionId: nextInstitutionId,
            invoiceId: nextInvoiceId,
            recurrenceId: nextRecurrenceId,
            destinationInstitutionId: nextDestinationInstitutionId,
        });
        const updated = await this.prisma.transaction.update({
            where: { id },
            data: {
                institutionId: dto.institutionId,
                categoryId: dto.categoryId,
                subCategoryId: dto.subCategoryId,
                type: dto.type,
                amount: dto.amount,
                description: dto.description,
                date: dto.date ? new Date(dto.date) : undefined,
                status: dto.status,
                invoiceId: dto.invoiceId,
                recurrenceId: dto.recurrenceId,
                destinationInstitutionId: dto.destinationInstitutionId,
            },
            include: {
                category: true,
                subCategory: true,
                institution: true,
            },
        });
        return this.formatTransaction(updated);
    }
    async assertTransactionRelations(userId, data) {
        const institution = await this.prisma.institution.findUnique({
            where: { id: data.institutionId },
        });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        if (institution.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        if (data.invoiceId) {
            const invoice = await this.prisma.invoice.findUnique({
                where: { id: data.invoiceId },
                include: { account: { include: { institution: true } } },
            });
            if (!invoice)
                throw new common_1.NotFoundException('Fatura não encontrada');
            if (invoice.account.institution.userId !== userId) {
                throw new common_1.ForbiddenException('Acesso negado');
            }
            if (invoice.account.institutionId !== data.institutionId) {
                throw new common_1.BadRequestException('Fatura deve pertencer à mesma instituição da transação');
            }
        }
        if (data.recurrenceId) {
            const recurrence = await this.prisma.recurrence.findUnique({
                where: { id: data.recurrenceId },
                include: { account: { include: { institution: true } } },
            });
            if (!recurrence)
                throw new common_1.NotFoundException('Recorrência não encontrada');
            if (recurrence.account.institution.userId !== userId) {
                throw new common_1.ForbiddenException('Acesso negado');
            }
            if (recurrence.account.institutionId !== data.institutionId) {
                throw new common_1.BadRequestException('Recorrência deve pertencer à mesma instituição da transação');
            }
        }
        if (data.destinationInstitutionId) {
            const destination = await this.prisma.institution.findUnique({
                where: { id: data.destinationInstitutionId },
            });
            if (!destination)
                throw new common_1.NotFoundException('Instituição de destino não encontrada');
            if (destination.userId !== userId)
                throw new common_1.ForbiddenException('Acesso negado');
            if (destination.id === data.institutionId) {
                throw new common_1.BadRequestException('Instituição de destino deve ser diferente da origem');
            }
        }
    }
    async syncCreate(userId, dto) {
        await this.assertTransactionRelations(userId, {
            institutionId: dto.institutionId,
            invoiceId: dto.invoiceId,
            recurrenceId: dto.recurrenceId,
            destinationInstitutionId: dto.destinationInstitutionId,
        });
        return this.prisma.transaction.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                institutionId: dto.institutionId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                type: dto.type,
                amount: dto.amount,
                description: dto.description ?? null,
                date: dto.date ? new Date(dto.date) : new Date(),
                status: dto.status ?? client_1.TransactionStatus.COMPLETED,
                invoiceId: dto.invoiceId ?? null,
                recurrenceId: dto.recurrenceId ?? null,
                destinationInstitutionId: dto.destinationInstitutionId ?? null,
                installmentReference: dto.installmentReference ?? null,
                installmentNumber: dto.installmentNumber ?? null,
                installmentTotal: dto.installmentTotal ?? null,
                receiptUrl: dto.receiptUrl ?? null,
                externalId: dto.externalId ?? null,
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                institutionId: dto.institutionId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                type: dto.type,
                amount: dto.amount,
                description: dto.description ?? null,
                date: dto.date ? new Date(dto.date) : undefined,
                status: dto.status,
                invoiceId: dto.invoiceId ?? null,
                recurrenceId: dto.recurrenceId ?? null,
                destinationInstitutionId: dto.destinationInstitutionId ?? null,
                installmentReference: dto.installmentReference ?? null,
                installmentNumber: dto.installmentNumber ?? null,
                installmentTotal: dto.installmentTotal ?? null,
                receiptUrl: dto.receiptUrl ?? null,
                externalId: dto.externalId ?? null,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        await this.getTransactionOrThrow(userId, dto.id);
        await this.assertTransactionRelations(userId, {
            institutionId: dto.institutionId,
            invoiceId: dto.invoiceId,
            recurrenceId: dto.recurrenceId,
            destinationInstitutionId: dto.destinationInstitutionId,
        });
        return this.prisma.transaction.update({
            where: { id: dto.id },
            data: {
                institutionId: dto.institutionId,
                categoryId: dto.categoryId ?? null,
                subCategoryId: dto.subCategoryId ?? null,
                type: dto.type,
                amount: dto.amount,
                description: dto.description ?? null,
                date: dto.date ? new Date(dto.date) : undefined,
                status: dto.status,
                invoiceId: dto.invoiceId ?? null,
                recurrenceId: dto.recurrenceId ?? null,
                destinationInstitutionId: dto.destinationInstitutionId ?? null,
                installmentReference: dto.installmentReference ?? null,
                installmentNumber: dto.installmentNumber ?? null,
                installmentTotal: dto.installmentTotal ?? null,
                receiptUrl: dto.receiptUrl ?? null,
                externalId: dto.externalId ?? null,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            include: {
                category: true,
                subCategory: true,
                institution: true,
            },
        });
    }
    async remove(dto) {
        const { userId, id } = dto;
        const transaction = await this.getTransactionOrThrow(userId, id);
        await this.prisma.$transaction(async (tx) => {
            await (0, deleted_record_util_1.createDeletedRecords)({ tx, userId, tableName: client_1.TableName.TRANSACTIONS, recordIds: [id] });
            await tx.transaction.delete({ where: { id: transaction.id } });
        });
    }
    formatTransaction(transaction) {
        return {
            id: transaction.id,
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description ?? undefined,
            date: transaction.date.toISOString(),
            status: transaction.status ?? undefined,
            destinationInstitutionId: transaction.destinationInstitutionId ?? undefined,
            category: transaction.category
                ? {
                    id: transaction.category.id,
                    name: transaction.category.name,
                }
                : undefined,
            subCategory: transaction.subCategory
                ? {
                    id: transaction.subCategory.id,
                    name: transaction.subCategory.name,
                }
                : undefined,
            institution: {
                id: transaction.institution.id,
                name: transaction.institution.name,
            },
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map