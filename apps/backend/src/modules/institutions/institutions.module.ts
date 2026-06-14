import { Module } from '@nestjs/common'
import { InstitutionsService } from './institutions.service'

@Module({
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
