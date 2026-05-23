import { Module } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { RecurrenceController } from './recurrence.controller';

@Module({
  controllers: [RecurrenceController],
  providers: [RecurrenceService],
})
export class RecurrenceModule {}
