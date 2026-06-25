import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncBudgetDto extends SyncRecordDto {
    categoryId: string;
    name: string;
    amountLimit: number;
    month: number;
    year: number;
}
