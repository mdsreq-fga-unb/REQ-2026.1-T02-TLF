import { PushChanges } from '../../../types/tables';
export declare class PushQueryDto {
    lastUpdatedAt: string;
}
export declare class PushBodyDto {
    changes: PushChanges;
}
export declare class PushRequestDto {
    userId: string;
    lastUpdatedAt: string;
    changes: PushChanges;
}
export declare class PushResponseDto {
    success: boolean;
}
