import { RecurrenceService } from './recurrence.service';
export declare class RecurrenceScheduler {
    private readonly recurrenceService;
    private readonly logger;
    constructor(recurrenceService: RecurrenceService);
    handleDailyRecurrences(): Promise<void>;
}
