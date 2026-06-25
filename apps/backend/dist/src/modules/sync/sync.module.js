"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_module_1 = require("../accounts/accounts.module");
const budget_module_1 = require("../budget/budget.module");
const categories_module_1 = require("../categories/categories.module");
const institutions_module_1 = require("../institutions/institutions.module");
const invoices_module_1 = require("../invoices/invoices.module");
const notification_module_1 = require("../notifications/notification.module");
const recurrences_module_1 = require("../recurrences/recurrences.module");
const sub_categories_module_1 = require("../sub-categories/sub-categories.module");
const transactions_module_1 = require("../transactions/transactions.module");
const sync_controller_1 = require("./sync.controller");
const sync_service_1 = require("./sync.service");
let SyncModule = class SyncModule {
};
exports.SyncModule = SyncModule;
exports.SyncModule = SyncModule = __decorate([
    (0, common_1.Module)({
        imports: [
            categories_module_1.CategoriesModule,
            sub_categories_module_1.SubCategoriesModule,
            institutions_module_1.InstitutionsModule,
            budget_module_1.BudgetModule,
            accounts_module_1.AccountsModule,
            invoices_module_1.InvoicesModule,
            recurrences_module_1.RecurrencesModule,
            transactions_module_1.TransactionsModule,
            notification_module_1.NotificationsModule,
        ],
        controllers: [sync_controller_1.SyncController],
        providers: [sync_service_1.SyncService],
    })
], SyncModule);
//# sourceMappingURL=sync.module.js.map