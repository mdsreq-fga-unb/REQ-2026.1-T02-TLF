import { Module } from '@nestjs/common'
import { RecurrencesService } from './recurrences.service'

@Module({
  providers: [RecurrencesService],
  exports: [RecurrencesService],
})
export class RecurrencesModule {}
