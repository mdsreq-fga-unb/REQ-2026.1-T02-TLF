import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyAccountsDto extends SyncFindManyBaseDto {
    id?: string;
    institutionId?: string;
    isActive?: boolean;
}
