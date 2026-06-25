import { AccountType, Currency } from 'generated/prisma/client';
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncAccountDto extends SyncRecordDto {
    institutionId: string;
    name: string;
    type?: AccountType;
    balance?: number;
    closingDay?: number | null;
    dueDay?: number | null;
    creditLimit?: number | null;
    currency?: Currency;
    isActive?: boolean;
}
