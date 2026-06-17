import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, validate } from './config/app.config'
import { PrismaModule } from './common/prisma/prisma.module'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { BudgetModule } from './modules/budget/budget.module'
import { TransactionsModule } from './modules/transactions/transactions.module'
import { SupabaseModule } from './modules/supabase/supabase.module'
import { UserModule } from './modules/user/user.module'
import { RecurrenceModule } from './modules/recurrence/recurrence.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    PrismaModule,
    ScheduleModule.forRoot(),
    AuthModule,
    CategoryModule,
    BudgetModule,
    TransactionsModule,
    UserModule,
    SupabaseModule,
    RecurrenceModule,
  ],
})
export class AppModule {}
