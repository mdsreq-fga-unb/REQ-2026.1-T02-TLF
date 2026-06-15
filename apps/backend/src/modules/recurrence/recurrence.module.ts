import { Module } from '@nestjs/common'
import { RecurrenceService } from './recurrence.service'
import { RecurrenceController } from './recurrence.controller'
import { RecurrenceScheduler } from './recurrence.scheduler'

@Module({
  controllers: [RecurrenceController],
  providers: [RecurrenceService, RecurrenceScheduler],
})
export class RecurrenceModule {}
