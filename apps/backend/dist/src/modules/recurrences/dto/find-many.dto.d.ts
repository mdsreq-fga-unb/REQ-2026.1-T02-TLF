import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyRecurrencesDto extends SyncFindManyBaseDto {
    id?: string;
    accountId?: string;
    categoryId?: string;
    isActive?: boolean;
}
