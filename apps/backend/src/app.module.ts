import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, validate } from './config/app.config'
import { ExampleModule } from './modules/example/example.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { BudgetModule } from './modules/budget/budget.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    PrismaModule,
    ExampleModule,
    AuthModule,
    BudgetModule,
  ],
})
export class AppModule {}
