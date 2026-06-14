import { Module } from '@nestjs/common'
import { AccountsModule } from '@modules/accounts/accounts.module'
import { InstitutionsService } from './institutions.service'

@Module({
  imports: [AccountsModule],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
