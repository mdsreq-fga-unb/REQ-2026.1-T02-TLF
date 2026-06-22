import { Module } from '@nestjs/common'
import { AuthModule } from '@modules/auth/auth.module'
import { BudgetController } from './budget.controller'
import { BudgetService } from './budget.service'

@Module({
  imports: [AuthModule],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
