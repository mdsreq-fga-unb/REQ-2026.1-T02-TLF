import { NotificationType } from 'generated/prisma/client';
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyNotificationsDto extends SyncFindManyBaseDto {
    id?: string;
    type?: NotificationType;
    isRead?: boolean;
    referenceType?: string;
}
