import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, validate } from './config/app.config'
import { PrismaModule } from './common/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { BudgetModule } from './modules/budget/budget.module'
import { TransactionsModule } from './modules/transactions/transactions.module'
import { SupabaseModule } from './modules/supabase/supabase.module'
import { UserModule } from './modules/user/user.module'
import { SyncModule } from './modules/sync/sync.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    PrismaModule,
    AuthModule,
    BudgetModule,
    TransactionsModule,
    UserModule,
    SupabaseModule,
    SyncModule,
  ],
})
export class AppModule {}
