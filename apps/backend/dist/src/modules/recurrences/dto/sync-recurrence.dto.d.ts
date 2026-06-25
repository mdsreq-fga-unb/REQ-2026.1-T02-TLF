import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncRecurrenceDto extends SyncRecordDto {
    accountId: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    description: string;
    amount: number;
    isActive?: boolean;
    chargeDate: number;
    startDate?: string;
    endDate?: string | null;
}
