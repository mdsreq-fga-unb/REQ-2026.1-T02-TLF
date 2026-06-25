import { NotificationType } from 'generated/prisma/client';
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncNotificationDto extends SyncRecordDto {
    type: NotificationType;
    title: string;
    description: string;
    isRead?: boolean;
    primaryActionLabel?: string | null;
    primaryAction?: string | null;
    secondaryActionLabel?: string | null;
    secondaryAction?: string | null;
    icon: string;
    color: string;
    referenceId: string;
    referenceType: string;
}
