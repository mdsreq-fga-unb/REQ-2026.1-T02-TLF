import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncInstitutionDto extends SyncRecordDto {
    name: string;
    color: string;
    icon?: string | null;
    logoUrl?: string | null;
}
