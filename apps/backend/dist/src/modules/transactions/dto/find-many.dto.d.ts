import { TransactionStatus, TransactionType } from 'generated/prisma/client';
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyTransactionsDto extends SyncFindManyBaseDto {
    id?: string;
    institutionId?: string;
    categoryId?: string;
    type?: TransactionType;
    status?: TransactionStatus;
}
