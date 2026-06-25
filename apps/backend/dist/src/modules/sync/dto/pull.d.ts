import { PullChanges } from '../../../types/tables';
export declare class PullRequestDto {
    userId: string;
    lastUpdatedAt?: string | null;
}
export declare class PullQueryDto {
    lastUpdatedAt?: string | null;
}
export declare class PullResponseDto {
    changes?: PullChanges;
    timestamp: Date;
}
