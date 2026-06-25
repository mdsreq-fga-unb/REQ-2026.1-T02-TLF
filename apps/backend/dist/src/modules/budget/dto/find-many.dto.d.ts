import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyBudgetsDto extends SyncFindManyBaseDto {
    id?: string;
    categoryId?: string;
    month?: number;
    year?: number;
}
