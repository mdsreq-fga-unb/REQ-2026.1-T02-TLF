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
exports.SyncService = void 0;
const prisma_service_1 = require("../../common/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const accounts_service_1 = require("../accounts/accounts.service");
const budget_service_1 = require("../budget/budget.service");
const categories_service_1 = require("../categories/categories.service");
const institutions_service_1 = require("../institutions/institutions.service");
const invoice_service_1 = require("../invoices/invoice.service");
const notifications_service_1 = require("../notifications/notifications.service");
const recurrences_service_1 = require("../recurrences/recurrences.service");
const sub_categories_service_1 = require("../sub-categories/sub-categories.service");
const transactions_service_1 = require("../transactions/transactions.service");
const date_1 = require("../../common/time/date");
let SyncService = class SyncService {
    constructor(prisma, categoriesService, subCategoriesService, institutionsService, budgetService, accountsService, invoiceService, recurrencesService, transactionsService, notificationsService) {
        this.prisma = prisma;
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.institutionsService = institutionsService;
        this.budgetService = budgetService;
        this.accountsService = accountsService;
        this.invoiceService = invoiceService;
        this.recurrencesService = recurrencesService;
        this.transactionsService = transactionsService;
        this.notificationsService = notificationsService;
    }
    async pull(dto) {
        const { userId } = dto;
        const lastUpdatedAt = dto.lastUpdatedAt ? new Date(dto.lastUpdatedAt) : (0, date_1.subMonths)(new Date(), 6);
        const timestamp = new Date();
        const syncFilter = { userId, createdAfter: lastUpdatedAt, updatedAfter: lastUpdatedAt };
        const [categories, subCategories, institutions, budgets, accounts, invoices, recurrences, transactions, notifications, deletedRecords,] = await Promise.all([
            this.categoriesService.findMany(syncFilter),
            this.subCategoriesService.findMany(syncFilter),
            this.institutionsService.findMany(syncFilter),
            this.budgetService.findMany(syncFilter),
            this.accountsService.findMany(syncFilter),
            this.invoiceService.findMany(syncFilter),
            this.recurrencesService.findMany(syncFilter),
            this.transactionsService.findMany(syncFilter),
            this.notificationsService.findMany(syncFilter),
            this.prisma.deletedRecord.findMany({
                where: { userId, deletedAt: { gt: lastUpdatedAt } },
            }),
        ]);
        const deletedByTable = deletedRecords.reduce((acc, record) => {
            if (!acc[record.tableName])
                acc[record.tableName] = [];
            acc[record.tableName].push(record.recordId);
            return acc;
        }, {});
        const splitChanges = (records) => ({
            created: records.filter((record) => record.createdAt > lastUpdatedAt),
            updated: records.filter((record) => record.updatedAt > lastUpdatedAt && record.createdAt <= lastUpdatedAt),
        });
        return {
            timestamp,
            changes: {
                transactions: {
                    ...splitChanges(transactions),
                    deleted: deletedByTable[client_1.TableName.TRANSACTIONS] ?? [],
                },
                categories: {
                    ...splitChanges(categories),
                    deleted: deletedByTable[client_1.TableName.CATEGORIES] ?? [],
                },
                sub_categories: {
                    ...splitChanges(subCategories),
                    deleted: deletedByTable[client_1.TableName.SUB_CATEGORIES] ?? [],
                },
                institutions: {
                    ...splitChanges(institutions),
                    deleted: deletedByTable[client_1.TableName.INSTITUTIONS] ?? [],
                },
                budgets: {
                    ...splitChanges(budgets),
                    deleted: deletedByTable[client_1.TableName.BUDGETS] ?? [],
                },
                accounts: {
                    ...splitChanges(accounts),
                    deleted: deletedByTable[client_1.TableName.ACCOUNTS] ?? [],
                },
                invoices: {
                    ...splitChanges(invoices),
                    deleted: deletedByTable[client_1.TableName.INVOICES] ?? [],
                },
                recurrences: {
                    ...splitChanges(recurrences),
                    deleted: deletedByTable[client_1.TableName.RECURRENCES] ?? [],
                },
                notifications: {
                    ...splitChanges(notifications),
                    deleted: deletedByTable[client_1.TableName.NOTIFICATIONS] ?? [],
                },
            },
        };
    }
    async push(dto) {
        const { userId, changes } = dto;
        try {
            await this.prisma.$transaction(async () => {
                await this.applyTableChanges(userId, changes.categories, {
                    create: (record) => this.categoriesService.syncCreate(userId, record),
                    update: (record) => this.categoriesService.syncUpdate(userId, record),
                    remove: (id) => this.categoriesService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.sub_categories, {
                    create: (record) => this.subCategoriesService.syncCreate(userId, record),
                    update: (record) => this.subCategoriesService.syncUpdate(userId, record),
                    remove: (id) => this.subCategoriesService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.institutions, {
                    create: (record) => this.institutionsService.syncCreate(userId, record),
                    update: (record) => this.institutionsService.syncUpdate(userId, record),
                    remove: (id) => this.institutionsService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.budgets, {
                    create: (record) => this.budgetService.syncCreate(userId, record),
                    update: (record) => this.budgetService.syncUpdate(userId, record),
                    remove: (id) => this.budgetService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.accounts, {
                    create: (record) => this.accountsService.syncCreate(userId, record),
                    update: (record) => this.accountsService.syncUpdate(userId, record),
                    remove: (id) => this.accountsService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.invoices, {
                    create: (record) => this.invoiceService.syncCreate(userId, record),
                    update: (record) => this.invoiceService.syncUpdate(userId, record),
                    remove: (id) => this.invoiceService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.recurrences, {
                    create: (record) => this.recurrencesService.syncCreate(userId, record),
                    update: (record) => this.recurrencesService.syncUpdate(userId, record),
                    remove: (id) => this.recurrencesService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.transactions, {
                    create: (record) => this.transactionsService.syncCreate(userId, record),
                    update: (record) => this.transactionsService.syncUpdate(userId, record),
                    remove: (id) => this.transactionsService.remove({ userId, id }),
                });
                await this.applyTableChanges(userId, changes.notifications, {
                    create: (record) => this.notificationsService.syncCreate(userId, record),
                    update: (record) => this.notificationsService.syncUpdate(userId, record),
                    remove: (id) => this.notificationsService.remove({ userId, id }),
                });
            });
            return { success: true };
        }
        catch (error) {
            console.error('Error pushing changes:', error);
            throw new common_1.BadRequestException(`Error pushing changes: ${error.message}`);
        }
    }
    async applyTableChanges(_userId, changes, handlers) {
        if (!changes)
            return;
        for (const record of changes.created ?? []) {
            await handlers.create(record);
        }
        for (const record of changes.updated ?? []) {
            await handlers.update(record);
        }
        for (const id of changes.deleted ?? []) {
            try {
                await handlers.remove(id);
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException)
                    continue;
                throw error;
            }
        }
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        categories_service_1.CategoriesService,
        sub_categories_service_1.SubCategoriesService,
        institutions_service_1.InstitutionsService,
        budget_service_1.BudgetService,
        accounts_service_1.AccountsService,
        invoice_service_1.InvoiceService,
        recurrences_service_1.RecurrencesService,
        transactions_service_1.TransactionsService,
        notifications_service_1.NotificationsService])
], SyncService);
//# sourceMappingURL=sync.service.js.map