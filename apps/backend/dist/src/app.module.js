"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./config/app.config");
const prisma_module_1 = require("./common/prisma/prisma.module");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./modules/auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const budget_module_1 = require("./modules/budget/budget.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const supabase_module_1 = require("./modules/supabase/supabase.module");
const user_module_1 = require("./modules/user/user.module");
const sync_module_1 = require("./modules/sync/sync.module");
const recurrence_module_1 = require("./modules/recurrence/recurrence.module");
const institution_module_1 = require("./modules/institution/institution.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: 'env/.env',
                isGlobal: true,
                load: [app_config_1.appConfig],
                validate: app_config_1.validate,
            }),
            prisma_module_1.PrismaModule,
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            budget_module_1.BudgetModule,
            transactions_module_1.TransactionsModule,
            user_module_1.UserModule,
            supabase_module_1.SupabaseModule,
            sync_module_1.SyncModule,
            recurrence_module_1.RecurrenceModule,
            institution_module_1.InstitutionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map