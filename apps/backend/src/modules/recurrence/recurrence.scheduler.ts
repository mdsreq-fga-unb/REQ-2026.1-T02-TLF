import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { RecurrenceService } from './recurrence.service'

@Injectable()
export class RecurrenceScheduler {
  private readonly logger = new Logger(RecurrenceScheduler.name)

  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Cron('0 0 * * *', { timeZone: 'America/Sao_Paulo' })
  async handleDailyRecurrences() {
    this.logger.log('Starting recurrence generation job...')

    try {
      await this.recurrenceService.generateTransactionsFromRecurrences()

      this.logger.log('Recurrence generation finished successfully')
    } catch (error) {
      this.logger.error('Recurrence generation failed', error)
    }
  }
}
