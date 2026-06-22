import { Module } from '@nestjs/common'
import { AccountsModule } from '../accounts/accounts.module'
import { BudgetModule } from '../budget/budget.module'
import { CategoriesModule } from '../categories/categories.module'
import { InstitutionsModule } from '../institutions/institutions.module'
import { InvoicesModule } from '../invoices/invoices.module'
import { NotificationsModule } from '../notifications/notification.module'
import { RecurrencesModule } from '../recurrences/recurrences.module'
import { SubCategoriesModule } from '../sub-categories/sub-categories.module'
import { TransactionsModule } from '../transactions/transactions.module'
import { SyncController } from './sync.controller'
import { SyncService } from './sync.service'

@Module({
  imports: [
    CategoriesModule,
    SubCategoriesModule,
    InstitutionsModule,
    BudgetModule,
    AccountsModule,
    InvoicesModule,
    RecurrencesModule,
    TransactionsModule,
    NotificationsModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
